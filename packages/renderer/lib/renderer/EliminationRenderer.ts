import * as d3 from 'd3';
import { BaseType, D3ZoomEvent, HierarchyNode } from 'd3';
import { SingleEliminationRenderer } from './SingleEliminationRenderer';
import { Bracket, BracketType, ContainedMatchType } from '@tourneyview/common';
import { Match, MatchType } from '@tourneyview/common';
import { TextFormatter } from '../formatter/TextFormatter';
import { BracketTypeRenderer } from '../types/renderer';
import { BaseBracketAnimator } from '../animator/BaseBracketAnimator';
import { Zoomer } from './Zoomer';
import { PublicBracketAnimationOpts } from '../types/animator';

export type EliminationRendererOpts = {
    animator: BaseBracketAnimator
    formatter: TextFormatter
    linkWidth?: number
    cellHeight?: number
    minCellWidth?: number
    maxCellWidth?: number
    onCellCreation?: EliminationRendererCellCreationCallback
    onCellUpdate?: EliminationRendererCellUpdateCallback
    thirdPlaceMatchLabelHeight?: number
    maxScale?: number
    curveFunction?: d3.CurveFactory
}

export type EliminationRendererCellCreationCallback = (element: d3.Selection<HTMLDivElement, HierarchyNode<Match>, HTMLDivElement, unknown>) => void;
export type EliminationRendererCellUpdateCallback = (element: d3.Selection<BaseType, HierarchyNode<Match>, HTMLDivElement, unknown>) => void;
export type EliminationHierarchyNodeData = { isRoot: true } | Match;
export type EliminationHierarchyNode = d3.HierarchyNode<EliminationHierarchyNodeData>;

const BRACKET_SIZE = 2048;

export class EliminationRenderer extends BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [BracketType.DOUBLE_ELIMINATION, BracketType.SINGLE_ELIMINATION];

    private readonly topRenderer: SingleEliminationRenderer;
    private bottomRenderer: SingleEliminationRenderer | null;

    private readonly animator: BaseBracketAnimator;
    private readonly formatter: TextFormatter;

    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    private readonly matchCellWrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly linkWrapper: d3.Selection<SVGGElement, undefined, null, undefined>;

    private readonly linkWidth: number;
    private readonly cellHeight: number;
    private readonly minCellWidth: number;
    private readonly maxCellWidth: number;
    private readonly onCellCreation?: EliminationRendererCellCreationCallback;
    private readonly onCellUpdate?: EliminationRendererCellUpdateCallback;
    private readonly thirdPlaceMatchLabelHeight: number;
    private readonly curveFunction?: d3.CurveFactory;

    private activeBracketId: string | null;
    private activeMatchType?: ContainedMatchType;
    private renderedBracketWidth: number;
    private renderedBracketHeight: number;

    private readonly zoomer: Zoomer;

    constructor(opts: EliminationRendererOpts) {
        super();

        this.animator = opts.animator;
        this.formatter = opts.formatter;
        this.linkWidth = opts.linkWidth ?? 50;
        this.cellHeight = opts.cellHeight ?? 65;
        this.minCellWidth = opts.minCellWidth ?? 175;
        this.maxCellWidth = opts.maxCellWidth ?? 250;
        this.onCellCreation = opts.onCellCreation;
        this.onCellUpdate = opts.onCellUpdate;
        this.activeBracketId = null;
        this.renderedBracketWidth = 1;
        this.renderedBracketHeight = 1;
        this.thirdPlaceMatchLabelHeight = opts.thirdPlaceMatchLabelHeight ?? 20;
        this.curveFunction = opts.curveFunction;

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

        this.topRenderer = this.createSingleElimRenderer();
        this.bottomRenderer = null;

        this.zoomer = new Zoomer(
            this.element as unknown as d3.Selection<Element, undefined, null, undefined>,
            this.onZoom.bind(this),
            opts.maxScale ?? 1.5);
    }

    async hide(opts: PublicBracketAnimationOpts = {}) {
        if (this.activeBracketId != null) {
            const element = this.getElement();
            this.animator.eliminationAnimator.beforeHide(element, this);
            await this.animator.eliminationAnimator.hide(element, { renderer: this, ...opts });
            element.style.visibility = 'hidden';
        }
    }

    beforeReveal(): void {
        const element = this.getElement();
        this.animator.eliminationAnimator.beforeReveal(element, this);
        element.style.visibility = 'visible';
    }

    async reveal(opts: PublicBracketAnimationOpts = {}): Promise<void> {
        await this.animator.eliminationAnimator.reveal(this.getElement(), { renderer: this, ...opts });
    }

    install(target: HTMLElement) {
        target.appendChild(this.getElement());
        this.zoomer.recalculateContainerSize();
    }

    destroy() {
        this.zoomer.disconnect();
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
        const bracketType = data.type as BracketType.DOUBLE_ELIMINATION | BracketType.SINGLE_ELIMINATION;

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
                bracketType,
                bracketTitle: data.type === BracketType.DOUBLE_ELIMINATION
                    ? matchGroup.containedMatchType === ContainedMatchType.WINNERS
                        ? 'Winners Bracket'
                        : 'Losers Bracket'
                    : undefined,
                thirdPlaceMatchLabelHeight: this.thirdPlaceMatchLabelHeight,
                isLosersBracket: data.type === BracketType.DOUBLE_ELIMINATION
                    && matchGroup.containedMatchType === ContainedMatchType.LOSERS,
                curveFunction: this.curveFunction
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
                bracketTitle: 'Winners Bracket',
                bracketType,
                thirdPlaceMatchLabelHeight: this.thirdPlaceMatchLabelHeight,
                isLosersBracket: false,
                curveFunction: this.curveFunction
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
                bracketType,
                thirdPlaceMatchLabelHeight: this.thirdPlaceMatchLabelHeight,
                isLosersBracket: true,
                curveFunction: this.curveFunction
            });

            this.renderedBracketHeight = winnersRenderResult.height + this.cellHeight / 2 + losersRenderResult.height;
            this.renderedBracketWidth = Math.max(winnersRenderResult.width, losersRenderResult.width);
        }

        this.zoomer.setContentSize(this.renderedBracketWidth, this.renderedBracketHeight);

        if (switchingBrackets) {
            this.beforeReveal();
            await this.reveal();
        }
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
            {
                animator: this.animator,
                formatter: this.formatter,
                onCellCreation: this.onCellCreation,
                onCellUpdate: this.onCellUpdate
            });
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
        this.matchCellWrapper.style('transform', Zoomer.toCSSTransform(event));
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
