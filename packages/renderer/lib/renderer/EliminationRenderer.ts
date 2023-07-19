import * as d3 from 'd3';
import { D3ZoomEvent } from 'd3';
import { SingleEliminationRenderer } from './SingleEliminationRenderer';
import { Bracket, BracketType } from '@tourneyview/common';
import { Match, MatchType } from '@tourneyview/common';
import { BracketAnimator } from '../types/animator';
import { TextFormatter } from '../formatter/TextFormatter';
import { BaseTextFormatter } from '../formatter/BaseTextFormatter';
import { DummyBracketAnimator } from '../animator/DummyBracketAnimator';

export type EliminationRendererOpts = Partial<{
    animator: BracketAnimator
    formatter: TextFormatter
    linkWidth: number
    cellHeight: number
    minCellWidth: number
    maxCellWidth: number
}>

export type EliminationHierarchyNodeData = { isRoot: true } | Match;
export type EliminationHierarchyNode = d3.HierarchyNode<EliminationHierarchyNodeData>;

export class EliminationRenderer {
    private readonly winnersRenderer: SingleEliminationRenderer;
    private losersRenderer: SingleEliminationRenderer | null;

    private readonly animator: BracketAnimator;
    private readonly formatter: TextFormatter;

    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    private readonly matchCellWrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly linkWrapper: d3.Selection<SVGGElement, undefined, null, undefined>;

    private readonly zoomBehavior: d3.ZoomBehavior<Element, unknown>;

    private readonly width: number;
    private readonly height: number;
    private readonly linkWidth: number;
    private readonly cellHeight: number;
    private readonly minCellWidth: number;
    private readonly maxCellWidth: number;

    private activeBracketId: string | null;

    constructor(width: number, height: number, opts: EliminationRendererOpts = {}) {
        this.width = width;
        this.height = height;
        this.animator = opts.animator ?? new DummyBracketAnimator();
        this.formatter = opts.formatter ?? new BaseTextFormatter();
        this.linkWidth = opts.linkWidth ?? 50;
        this.cellHeight = opts.cellHeight ?? 65;
        this.minCellWidth = opts.minCellWidth ?? 175;
        this.maxCellWidth = opts.maxCellWidth ?? 250;
        this.activeBracketId = null;

        this.element = d3
            .create('div')
            .classed('elimination-renderer', true)
            .style('width', `${width}px`)
            .style('height', `${height}px`)
            .style('position', 'relative')
            .style('overflow', 'hidden');

        this.matchCellWrapper = this.element
            .append('div')
            .style('transform-origin', '0 0');

        this.svg = this.element
            .append('svg')
            .attr('viewBox', [0, 0, width, height])
            .attr('width', width)
            .attr('height', height)
            .style('max-width', '100%')
            .style('height', 'auto');

        this.linkWrapper = this.svg
            .append('g')
            .attr('transform-origin', '0 0')
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-width', 1.5);

        this.zoomBehavior = d3.zoom()
            .extent([[0, 0], [this.width, this.height]])
            .on('zoom', e => this.onZoom(e));

        this.winnersRenderer = new SingleEliminationRenderer(this.width, this.height, { animator: this.animator, formatter: this.formatter });
        this.losersRenderer = null;
        this.appendSingleElimRenderer(this.winnersRenderer);
    }

    async setData(data: Bracket) {
        if (data.matchGroups.length !== 1) {
            throw new Error(`Rendering elimination groups requires only one bracket group to be present! (Found ${data.matchGroups.length})`);
        }

        const matchGroup = data.matchGroups[0];
        const switchingBrackets = data.id !== this.activeBracketId;
        if (this.activeBracketId != null && switchingBrackets) {
            const element = this.getElement();
            await this.animator.hideEliminationBracket(element, this);
            element.style.visibility = 'hidden';
        }

        this.activeBracketId = matchGroup.id;

        if (data.type === BracketType.SINGLE_ELIMINATION && this.losersRenderer != null) {
            this.losersRenderer.destroy();
            this.losersRenderer = null;
        } else if (data.type === BracketType.DOUBLE_ELIMINATION && this.losersRenderer == null) {
            this.losersRenderer = new SingleEliminationRenderer(this.width, this.height, { animator: this.animator, formatter: this.formatter });
            this.appendSingleElimRenderer(this.losersRenderer);
        }

        let bracketHeight: number;
        let bracketWidth: number;

        if (data.type === BracketType.SINGLE_ELIMINATION) {
            const hierarchy = this.buildMatchHierarchy(matchGroup.matches);
            const cellSeparation = this.getCellSeparation(hierarchy.height);
            const renderResult = this.winnersRenderer.setData(hierarchy, {
                cellWidth: this.getCellWidth(hierarchy),
                cellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                hasThirdPlaceMatch: matchGroup.matches.some(match => match.type === MatchType.LOSERS)
            });
            bracketHeight = renderResult.height;
            bracketWidth = renderResult.width;
        } else {
            const winnersHierarchy = this.buildMatchHierarchy(matchGroup.matches.filter(match => match.type === MatchType.WINNERS));
            const losersHierarchy = this.buildMatchHierarchy(matchGroup.matches.filter(match => match.type === MatchType.LOSERS));

            const cellWidth = Math.min(this.getCellWidth(winnersHierarchy), this.getCellWidth(losersHierarchy, true));
            const winnersCellSeparation = this.getCellSeparation(winnersHierarchy.height);
            const losersCellSeparation = this.getCellSeparation(losersHierarchy.height);

            const winnersRenderResult = this.winnersRenderer.setData(winnersHierarchy, {
                cellWidth,
                cellSeparation: winnersCellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                hasThirdPlaceMatch: false,
                hasBracketReset: true,
                bracketTitle: 'Winners Bracket'
            });
            const losersRenderResult = this.losersRenderer!.setData(losersHierarchy, {
                cellWidth,
                cellSeparation: losersCellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                cellOffset: 1,
                yOffset: winnersRenderResult.height + this.cellHeight / 2,
                hasThirdPlaceMatch: false,
                bracketTitle: 'Losers Bracket'
            });

            bracketHeight = winnersRenderResult.height + this.cellHeight / 2 + losersRenderResult.height;
            bracketWidth = Math.max(winnersRenderResult.width, losersRenderResult.width);
        }

        const scale = Math.min(this.height / bracketHeight, this.width / bracketWidth, 1);

        this.zoomBehavior.translateTo(
            this.element as unknown as d3.Selection<Element, unknown, null, unknown>,
            bracketWidth / 2,
            bracketHeight / 2);

        this.zoomBehavior.scaleTo(
            this.element as unknown as d3.Selection<Element, unknown, null, unknown>,
            scale);

        if (switchingBrackets) {
            const element = this.getElement();
            this.animator.beforeEliminationBracketReveal(element, this);
            element.style.visibility = 'visible';
            await this.animator.revealEliminationBracket(element, this);
        }
    }

    getElement(): HTMLElement {
        return this.element.node()!;
    }

    getBracketDepth(): number {
        return Math.max(
            this.winnersRenderer.hierarchy?.height ?? 0,
            this.losersRenderer?.hierarchy?.height ?? 0)
    }

    private appendSingleElimRenderer(renderer: SingleEliminationRenderer) {
        const elems = renderer.getElements();
        this.matchCellWrapper.append(() => elems[0]);
        this.linkWrapper.append(() => elems[1]);
    }

    private buildMatchHierarchy(matches: Match[]): EliminationHierarchyNode {
        const finalRoundNumber = Math.max(...matches.map(match => match.roundNumber ?? 0));

        return d3.hierarchy<{ isRoot: true } | Match>(
            { isRoot: true },
            hierarchyItem => {
                if ('isRoot' in hierarchyItem && hierarchyItem.isRoot) {
                    return matches.filter(match => match.roundNumber === finalRoundNumber)
                } else {
                    return matches.filter(match => (hierarchyItem as Match).id === match.nextMatchId);
                }
            })
    }

    private getCellWidth(hierarchy: EliminationHierarchyNode, losers = false): number {
        const result = losers ? (this.width - this.linkWidth * hierarchy.height) / (hierarchy.height + 1) : (this.width - this.linkWidth * (hierarchy.height - 1)) / hierarchy.height;
        return Math.max(Math.min(result, this.maxCellWidth), this.minCellWidth);
    }

    private onZoom(event: D3ZoomEvent<HTMLElement, never>) {
        this.linkWrapper
            .selectAll('.elimination-renderer__link-group')
            .attr('transform', event.transform.toString());
        this.matchCellWrapper.style('transform', `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`);
    }

    private getCellSeparation(bracketHeight: number): number {
        switch (bracketHeight) {
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return 1.25;
            default:
                return 1.1;
        }
    }
}
