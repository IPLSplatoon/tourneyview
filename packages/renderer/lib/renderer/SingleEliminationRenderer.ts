import * as d3 from 'd3';
import { BaseType, HierarchyPointNode, tree } from 'd3';
import { BracketType, Match, MatchType } from '@tourneyview/common';
import {
    EliminationHierarchyNode,
    EliminationHierarchyNodeData,
    EliminationRendererCellCreationCallback, EliminationRendererCellUpdateCallback
} from './EliminationRenderer';
import { BracketAnimator } from '../types/animator';
import { TextFormatter } from '../formatter/TextFormatter';
import { BaseTextFormatter } from '../formatter/BaseTextFormatter';

export type SingleEliminationRendererOpts = {
    animator: BracketAnimator
    formatter: TextFormatter
    onCellCreation?: EliminationRendererCellCreationCallback
    onCellUpdate?: EliminationRendererCellUpdateCallback
};

type SingleEliminationRendererSetDataOpts = {
    hasThirdPlaceMatch: boolean
    hasBracketReset?: boolean
    cellHeight: number
    cellWidth: number
    linkWidth: number
    cellSeparation: number
    cellOffset?: number
    yOffset?: number
    bracketTitle?: string
    bracketHeaderOffset?: number
    bracketType: BracketType
    thirdPlaceMatchLabelHeight: number
    isLosersBracket: boolean
};

export class SingleEliminationRenderer {
    private readonly svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    private readonly linkGroup: d3.Selection<SVGGElement, undefined, null, undefined>;

    private readonly domElementContainer: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly bracketHeader: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly bracketTitle: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly roundLabelContainer: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly width: number;
    private readonly height: number;

    private readonly animator: BracketAnimator;
    private readonly formatter: TextFormatter;
    hierarchy: EliminationHierarchyNode | null;

    private readonly onCellCreation?: EliminationRendererCellCreationCallback;
    private readonly onCellUpdate?: EliminationRendererCellUpdateCallback;

    constructor(width: number, height: number, opts: SingleEliminationRendererOpts) {
        this.height = height;
        this.width = width;
        this.animator = opts.animator;
        this.formatter = opts.formatter;
        this.onCellCreation = opts.onCellCreation;
        this.onCellUpdate = opts.onCellUpdate;

        this.svg = d3
            .create('svg')
            .classed('elimination-renderer__links', true)
            .attr('viewBox', [0, 0, width, height])
            .attr('width', width)
            .attr('height', height)
            .style('max-width', '100%')
            .style('height', 'auto');

        this.linkGroup = this.svg
            .append('g')
            .classed('elimination-renderer__link-group', true)
            .attr('transform-origin', '0 0');

        this.domElementContainer = d3
            .create('div')
            .style('transform-origin', '0 0');

        this.bracketHeader = this.domElementContainer
            .append('div')
            .style('position', 'absolute')
            .classed('bracket-header', true);
        this.bracketTitle = this.bracketHeader
            .append('div')
            .classed('elimination-renderer__bracket-title', true);
        this.roundLabelContainer = this.bracketHeader
            .append('div')
            .classed('elimination-renderer__round-labels', true);

        this.hierarchy = null;
    }

    destroy() {
        this.svg.remove();
        this.domElementContainer.remove();
    }

    getElements(): [HTMLElement, SVGSVGElement] {
        return [this.domElementContainer.node()!, this.svg.node()!];
    }

    setData(hierarchy: EliminationHierarchyNode, opts: SingleEliminationRendererSetDataOpts): { width: number, height: number } {
        this.hierarchy = hierarchy;

        if (hierarchy.length === 0) {
            this.getElements().forEach(el => el.style.display = 'none');
            return { width: 0, height: 0 };
        } else {
            this.getElements().forEach(el => el.style.removeProperty('display'));
        }

        const cellOffset = opts.cellOffset ?? 0;
        const hasBracketReset = opts.hasBracketReset ?? false;

        this.bracketTitle
            .text(opts.bracketTitle ?? '');
        this.roundLabelContainer
            .style('column-gap', `${opts.linkWidth}px`)
            .selectAll('div.round-label')
            .data(d3.range(hierarchy.height))
            .join('div')
            .classed('round-label', true)
            .style('width', `${opts.cellWidth}px`)
            .text(d => (this.formatter as BaseTextFormatter).formatDoubleEliminationRoundNumber(d + 1, hierarchy.height, hasBracketReset, opts.isLosersBracket));

        const headerSpacing = opts.bracketHeaderOffset ?? 8;
        const headerHeight = this.bracketHeader.node()?.offsetHeight ?? 0;
        this.bracketHeader
            .style('transform', `translate(${cellOffset * (opts.cellWidth + opts.linkWidth)}px, ${opts.yOffset ?? 0}px)`);

        const bracketTree = tree<EliminationHierarchyNodeData>()
            .separation((a, b) => {
                if (opts.hasThirdPlaceMatch && ((a.data as Match).type === MatchType.LOSERS || (b.data as Match).type === MatchType.LOSERS)) {
                    return 2;
                } else {
                    return opts.cellSeparation;
                }
            })
            .nodeSize([opts.cellHeight, opts.cellWidth + opts.linkWidth])(hierarchy);

        let x0 = Infinity;
        let x1 = -x0;
        bracketTree.each(d => {
            if ('isRoot' in d.data) return;
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const links = bracketTree.links()
            .filter(link => !('isRoot' in link.target.data) && !('isRoot' in link.source.data))
            .map(link => ({
                ...link,
                source: {
                    ...link.source,
                    y: link.source.y + opts.cellWidth / 2
                },
                target: {
                    ...link.target,
                    y: link.target.y - opts.cellWidth / 2
                }
            }));

        const yOffset = (opts.yOffset ?? 0) + headerHeight + headerSpacing;
        const bracketWidth = opts.cellWidth * (hierarchy.height + cellOffset) + opts.linkWidth * (hierarchy.height - 1 + cellOffset);
        const widthOffset = this.width - bracketWidth;

        const minX = -opts.cellWidth / 2 - opts.linkWidth + widthOffset;
        const minY = x0 - opts.cellHeight / 2 - yOffset;

        this.svg
            .attr('viewBox', [minX, minY, this.width, this.height]);
        this.linkGroup
            .attr('transform-origin', `${minX} ${minY}`);

        this.linkGroup
            .selectAll('path')
            .data(links)
            .join('path')
            // @ts-ignore
            .attr('d', d3.link(d3.curveBumpX).y(d => d.x).x(d => this.width - d.y))
            .attr('pathLength', 1)
            .attr('data-depth', d => d.source.depth)
            .classed('bracket-link', true);

        const drawTeamName = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', text: (d: Datum) => string | undefined | null) =>
            elem
                .append('div')
                .classed('match-cell__team-name', true)
                .classed(`match-cell__${position}-team-name`, true)
                .text(d => this.formatter.formatTeamName(text(d)));

        const drawScore = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', text: (d: Datum) => number | undefined | null) =>
            elem
                .append('div')
                .classed('match-cell__score-wrapper', true)
                .append('div')
                .classed('match-cell__score', true)
                .classed(`match-cell__${position}-score`, true)
                .text(d => this.formatter.formatScore(text(d)));

        const drawThirdPlaceMatchLabel = (selection: d3.Selection<HTMLDivElement, d3.HierarchyNode<Match>, HTMLDivElement, undefined>) => {
            const labelHeight = opts.thirdPlaceMatchLabelHeight;
            selection.each(function(d) {
                if (isThirdPlaceMatch(d)) {
                    d3.select(this)
                        .classed('has-third-place-match-label', true)
                        .append('div')
                        .classed('match-cell__third-place-match-label', true)
                        .style('height', `${labelHeight}px`)
                        .text('Third place match');
                }
            });
        }

        const updateTeamName = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', text: (d: Datum) => string | undefined | null) => {
            const that = this;
            return elem
                .select(`.match-cell__${position}-team-name`)
                .each(function(d) {
                    const currentText = (this as HTMLElement).textContent ?? '';
                    const newText = that.formatter.formatTeamName(text(d));
                    if (currentText !== newText) {
                        that.animator.updateText(this as HTMLElement, currentText, newText, opts.bracketType);
                    }
                });
        };

        const updateScore = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', score: (d: Datum) => number | undefined | null) => {
            const that = this;
            return elem
                .select(`.match-cell__${position}-score`)
                .each(function(d) {
                    const currentScore = parseInt((this as HTMLElement).textContent ?? '');
                    const newScore = score(d) ?? NaN;
                    if (currentScore !== newScore && !(isNaN(currentScore) && isNaN(newScore))) {
                        that.animator.updateScore(
                            this as HTMLElement,
                            currentScore,
                            newScore,
                            that.formatter.formatScore(newScore),
                            opts.bracketType
                        );
                    }
                });
        };

        const isThirdPlaceMatch = (d: d3.HierarchyNode<Match>) => d.data.type === MatchType.LOSERS && opts.hasThirdPlaceMatch;

        this.domElementContainer
            .selectAll('div.match-cell-wrapper')
            .data(
                hierarchy.descendants().filter(node => !('isRoot' in node.data)) as d3.HierarchyNode<Match>[],
                datum => (datum as d3.HierarchyNode<Match>).data.id)
            .join(
                enter => {
                    const wrapperSelection = enter
                        .append('div')
                        .style('height', d => isThirdPlaceMatch(d)
                            ? `${(opts.cellHeight + opts.thirdPlaceMatchLabelHeight)}px`
                            : `${(opts.cellHeight)}px`)
                        .style('width', `${(opts.cellWidth)}px`)
                        .style('left', d => `${this.width - (d as HierarchyPointNode<Match>).y + opts.linkWidth - widthOffset}px`)
                        .style('top', d => `${((d as HierarchyPointNode<Match>).x - opts.cellHeight / 2) - x0 + opts.cellHeight / 2 + yOffset}px`)
                        .style('position', 'absolute')
                        .classed('match-cell-wrapper', true)
                        .attr('data-depth', d => d.depth);

                    wrapperSelection
                        .append('div')
                        .classed('match-cell', true)
                        .call(drawThirdPlaceMatchLabel)
                        .call(drawTeamName, 'top', d => d.data?.topTeam.name)
                        .call(drawScore, 'top', d => d.data?.topTeam.score)
                        .call(drawTeamName, 'bottom', d => d.data?.bottomTeam.name)
                        .call(drawScore, 'bottom', d => d.data?.bottomTeam.score);

                    return this.onCellCreation ? wrapperSelection.call(this.onCellCreation) : wrapperSelection;
                },
                update => {
                    const selection = update
                        .style('left', d => `${this.width - (d as HierarchyPointNode<Match>).y + opts.linkWidth - widthOffset}px`)
                        .style('top', d => `${((d as HierarchyPointNode<Match>).x - opts.cellHeight / 2) - x0 + opts.cellHeight / 2 + yOffset}px`)
                        .style('height', d => isThirdPlaceMatch(d)
                            ? `${(opts.cellHeight + opts.thirdPlaceMatchLabelHeight)}px`
                            : `${(opts.cellHeight)}px`)
                        .style('width', `${(opts.cellWidth)}px`)
                        .call(updateTeamName, 'top', d => d.data?.topTeam.name)
                        .call(updateScore, 'top', d => d.data?.topTeam.score)
                        .call(updateTeamName, 'bottom', d => d.data?.bottomTeam.name)
                        .call(updateScore, 'bottom', d => d.data?.bottomTeam.score);

                    return this.onCellUpdate ? selection.call(this.onCellUpdate) : selection;
                });

        return {
            width: bracketWidth,
            height: this.measureHierarchy(hierarchy, opts.cellHeight, opts.cellSeparation) + headerHeight + headerSpacing
        };
    }

    private measureHierarchy(hierarchy: EliminationHierarchyNode, cellHeight: number, separation: number): number {
        const countByDepth: Record<number, number> = { };
        hierarchy.each(node => {
            if (countByDepth[node.depth] == null) {
                countByDepth[node.depth] = 1;
            } else {
                countByDepth[node.depth]++;
            }
        });

        const maxHierarchyHeight = Math.max(...Object.values(countByDepth));
        return (maxHierarchyHeight - 1) * (cellHeight * separation) + cellHeight;
    }

}
