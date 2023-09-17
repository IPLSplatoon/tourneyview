import * as d3 from 'd3';
import { D3ZoomEvent, HierarchyNode } from 'd3';
import { SingleEliminationRenderer } from './SingleEliminationRenderer';
import { Bracket, BracketType, ContainedMatchType } from '@tourneyview/common';
import { Match, MatchType } from '@tourneyview/common';
import { BracketAnimator } from '../types/animator';
import { TextFormatter } from '../formatter/TextFormatter';
import { BracketTypeRenderer } from '../types/renderer';

export type EliminationRendererOpts = {
    animator: BracketAnimator
    formatter: TextFormatter
    linkWidth?: number
    cellHeight?: number
    minCellWidth?: number
    maxCellWidth?: number
    onCellCreated?: EliminationRendererCellCreatedCallback
}

export type EliminationRendererCellCreatedCallback = (element: d3.Selection<HTMLDivElement, HierarchyNode<Match>, HTMLDivElement, unknown>) => void;
export type EliminationHierarchyNodeData = { isRoot: true } | Match;
export type EliminationHierarchyNode = d3.HierarchyNode<EliminationHierarchyNodeData>;

const BRACKET_SIZE = 2048;

export class EliminationRenderer extends BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [BracketType.DOUBLE_ELIMINATION, BracketType.SINGLE_ELIMINATION];

    private readonly topRenderer: SingleEliminationRenderer;
    private bottomRenderer: SingleEliminationRenderer | null;

    private readonly animator: BracketAnimator;
    private readonly formatter: TextFormatter;

    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    private readonly matchCellWrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly linkWrapper: d3.Selection<SVGGElement, undefined, null, undefined>;

    private readonly zoomBehavior: d3.ZoomBehavior<Element, unknown>;

    private readonly linkWidth: number;
    private readonly cellHeight: number;
    private readonly minCellWidth: number;
    private readonly maxCellWidth: number;
    private readonly onCellCreated?: EliminationRendererCellCreatedCallback;

    private activeBracketId: string | null;
    private activeMatchType?: ContainedMatchType;
    private renderedBracketWidth: number;
    private renderedBracketHeight: number;

    private resizeObserver: ResizeObserver;

    constructor(opts: EliminationRendererOpts) {
        super();

        this.animator = opts.animator;
        this.formatter = opts.formatter;
        this.linkWidth = opts.linkWidth ?? 50;
        this.cellHeight = opts.cellHeight ?? 65;
        this.minCellWidth = opts.minCellWidth ?? 175;
        this.maxCellWidth = opts.maxCellWidth ?? 250;
        this.onCellCreated = opts.onCellCreated;
        this.activeBracketId = null;
        this.renderedBracketWidth = 1;
        this.renderedBracketHeight = 1;

        this.element = d3
            .create('div')
            .classed('elimination-renderer', true)
            .style('position', 'relative')
            .style('overflow', 'hidden');

        this.matchCellWrapper = this.element
            .append('div')
            .style('transform-origin', '0 0');

        this.svg = this.element
            .append('svg')
            .attr('viewBox', [0, 0, BRACKET_SIZE, BRACKET_SIZE])
            .attr('width', BRACKET_SIZE)
            .attr('height', BRACKET_SIZE);

        this.linkWrapper = this.svg
            .append('g')
            .attr('transform-origin', '0 0')
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-width', 1.5);

        this.zoomBehavior = d3.zoom()
            .extent([[0, 0], [BRACKET_SIZE, BRACKET_SIZE]])
            .on('zoom', e => this.onZoom(e));

        this.topRenderer = this.createSingleElimRenderer();
        this.bottomRenderer = null;

        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    this.setZoom(entry.contentBoxSize[0].blockSize, entry.contentBoxSize[0].inlineSize);
                }
            }
        });

        this.resizeObserver.observe(this.element.node()!);
    }

    async hide() {
        if (this.activeBracketId != null) {
            const element = this.getElement();
            this.animator.eliminationAnimator.beforeHide(element, this);
            await this.animator.eliminationAnimator.hide(element, this);
            element.style.visibility = 'hidden';
        }
    }

    install(target: HTMLElement) {
        target.appendChild(this.getElement());
    }

    destroy() {
        this.resizeObserver.disconnect();
        this.element.remove();
    }

    async setData(data: Bracket) {
        if (data.matchGroups.length !== 1) {
            throw new Error(`Rendering elimination groups requires only one bracket group to be present! (Found ${data.matchGroups.length})`);
        }

        const matchGroup = data.matchGroups[0];
        const switchingBrackets = matchGroup.id !== this.activeBracketId || this.activeMatchType !== matchGroup.containedMatchType;
        if (switchingBrackets) {
            await this.hide();
        }

        this.activeBracketId = matchGroup.id;
        this.activeMatchType = matchGroup.containedMatchType;

        // if (de_winners_only || se) draw winners
        // elif (de_losers_only) draw losers
        // elif (de_all) draw winners+losers

        if ((data.type === BracketType.SINGLE_ELIMINATION
                || data.type === BracketType.DOUBLE_ELIMINATION && matchGroup.containedMatchType !== ContainedMatchType.ALL_MATCHES)
            && this.bottomRenderer != null
        ) {
            this.bottomRenderer.destroy();
            this.bottomRenderer = null;
        } else if (data.type === BracketType.DOUBLE_ELIMINATION
            && matchGroup.containedMatchType !== ContainedMatchType.WINNERS
            && this.bottomRenderer == null
        ) {
            this.bottomRenderer = this.createSingleElimRenderer();
        }

        if (data.type === BracketType.SINGLE_ELIMINATION || matchGroup.containedMatchType !== ContainedMatchType.ALL_MATCHES) {
            const hierarchy = this.buildMatchHierarchy(matchGroup.matches);
            const cellSeparation = this.getCellSeparation(hierarchy.height);

            const renderResult = this.topRenderer.setData(hierarchy, {
                cellWidth: this.getCellWidth(hierarchy),
                cellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                hasThirdPlaceMatch: data.type === BracketType.SINGLE_ELIMINATION
                    && matchGroup.matches.some(match => match.type === MatchType.LOSERS),
                bracketType: data.type,
                hasBracketReset: data.type === BracketType.DOUBLE_ELIMINATION
                    && matchGroup.containedMatchType === ContainedMatchType.WINNERS
                    && (matchGroup.hasBracketReset ?? true),
                bracketTitle: data.type === BracketType.DOUBLE_ELIMINATION
                    ? matchGroup.containedMatchType === ContainedMatchType.WINNERS
                        ? 'Winners Bracket'
                        : 'Losers Bracket'
                    : undefined,
            });

            this.renderedBracketHeight = renderResult.height;
            this.renderedBracketWidth = renderResult.width;
        } else {
            const winnersHierarchy = this.buildMatchHierarchy(matchGroup.matches.filter(match => match.type === MatchType.WINNERS));
            const losersHierarchy = this.buildMatchHierarchy(matchGroup.matches.filter(match => match.type === MatchType.LOSERS));

            const cellWidth = Math.min(this.getCellWidth(winnersHierarchy), this.getCellWidth(losersHierarchy, true));
            const winnersCellSeparation = this.getCellSeparation(winnersHierarchy.height);
            const losersCellSeparation = this.getCellSeparation(losersHierarchy.height);

            const winnersRenderResult = this.topRenderer.setData(winnersHierarchy, {
                cellWidth,
                cellSeparation: winnersCellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                hasThirdPlaceMatch: false,
                hasBracketReset: matchGroup.hasBracketReset ?? true,
                bracketTitle: 'Winners Bracket',
                bracketType: data.type
            });
            const losersRenderResult = this.bottomRenderer!.setData(losersHierarchy, {
                cellWidth,
                cellSeparation: losersCellSeparation,
                linkWidth: this.linkWidth,
                cellHeight: this.cellHeight,
                cellOffset: 1,
                yOffset: winnersRenderResult.height + this.cellHeight / 2,
                hasThirdPlaceMatch: false,
                bracketTitle: 'Losers Bracket',
                bracketType: data.type
            });

            this.renderedBracketHeight = winnersRenderResult.height + this.cellHeight / 2 + losersRenderResult.height;
            this.renderedBracketWidth = Math.max(winnersRenderResult.width, losersRenderResult.width);
        }

        const boundingRect = this.element.node()!.getBoundingClientRect();
        this.setZoom(boundingRect.height, boundingRect.width);

        if (switchingBrackets) {
            const element = this.getElement();
            this.animator.eliminationAnimator.beforeReveal(element, this);
            element.style.visibility = 'visible';
            await this.animator.eliminationAnimator.reveal(element, this);
        }
    }

    setZoom(height: number, width: number) {
        const scale = Math.min(height / this.renderedBracketHeight, width / this.renderedBracketWidth);

        this.zoomBehavior.extent([[0, 0], [width, height]]);
        this.zoomBehavior.translateTo(
            this.element as unknown as d3.Selection<Element, unknown, null, unknown>,
            this.renderedBracketWidth / 2,
            this.renderedBracketHeight / 2
        );
        this.zoomBehavior.scaleTo(
            this.element as unknown as d3.Selection<Element, unknown, null, unknown>,
            scale
        );
    }

    getElement(): HTMLElement {
        return this.element.node()!;
    }

    getBracketDepth(): number {
        return Math.max(
            this.topRenderer.hierarchy?.height ?? 0,
            this.bottomRenderer?.hierarchy?.height ?? 0)
    }

    private createSingleElimRenderer(): SingleEliminationRenderer {
        const renderer = new SingleEliminationRenderer(
            BRACKET_SIZE,
            BRACKET_SIZE,
            { animator: this.animator, formatter: this.formatter, onCellCreated: this.onCellCreated });
        const elems = renderer.getElements();

        this.matchCellWrapper.append(() => elems[0]);
        this.linkWrapper.append(() => elems[1]);
        return renderer;
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
        const result = losers ? (BRACKET_SIZE - this.linkWidth * hierarchy.height) / (hierarchy.height + 1) : (BRACKET_SIZE - this.linkWidth * (hierarchy.height - 1)) / hierarchy.height;
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
