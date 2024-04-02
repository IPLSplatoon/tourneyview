import * as d3 from 'd3';
import { BaseType } from 'd3';
import { TextFormatter } from '../formatter/TextFormatter';
import { Bracket, BracketType, Match, MatchTeam } from '@tourneyview/common';
import { Autoscroller } from './Autoscroller';
import { BracketTypeRenderer } from '../types/renderer';
import { BaseBracketAnimator } from '../animator/BaseBracketAnimator';

export type SwissRendererOpts = {
    formatter: TextFormatter
    animator: BaseBracketAnimator
    rowHeight?: number
    rowGap?: number
    useScrollMask?: boolean
};

export class SwissRenderer extends BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [BracketType.SWISS];

    private readonly wrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly rowHeight: number;
    private readonly rowGap: number;

    private readonly formatter: TextFormatter;
    private readonly scroller: Autoscroller;
    private readonly animator: BaseBracketAnimator;

    private activeBracketId: string | null;
    private activeRoundNumber?: number;

    private resizeObserver: ResizeObserver;

    constructor(opts: SwissRendererOpts) {
        super();

        this.formatter = opts.formatter;
        this.animator = opts.animator;
        this.activeBracketId = null;

        this.rowHeight = opts.rowHeight ?? 50;
        this.rowGap = opts.rowGap ?? 5;

        this.wrapper = d3
            .create('div')
            .classed('swiss-renderer__wrapper', true);
        this.element = this.wrapper
            .append('div')
            .classed('swiss-renderer', true)
            .style('grid-auto-rows', `${(this.rowHeight)}px`)
            .style('row-gap', `${this.rowGap}px`);

        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    this.handleHeightChange(entry.contentBoxSize[0].blockSize);
                }
            }
        });

        this.resizeObserver.observe(this.wrapper.node()!);

        this.scroller = new Autoscroller(this.element.node()!, this.rowHeight, this.rowGap, opts.useScrollMask ?? false);
    }

    private handleHeightChange(elementHeight: number) {
        const rowsPerScreen = Math.floor((elementHeight + this.rowGap) / (this.rowHeight + this.rowGap));
        const innerHeight = rowsPerScreen * (this.rowHeight + this.rowGap) - this.rowGap;
        this.element.style('max-height', `${innerHeight}px`);
        this.scroller.setHeights(innerHeight, rowsPerScreen);
    }

    install(target: HTMLElement) {
        const element = this.getElement();
        target.appendChild(element);
        this.handleHeightChange(element.getBoundingClientRect().height);
    }

    destroy() {
        this.wrapper.remove();
        this.resizeObserver.disconnect();
    }

    getElement(): HTMLElement {
        return this.wrapper.node()!;
    }

    async hide() {
        if (this.activeBracketId != null) {
            const element = this.getElement();
            this.animator.swissAnimator.beforeHide(element, this);
            await this.animator.swissAnimator.hide(element, this);
            this.scroller.stop();
            element.style.visibility = 'hidden';
        }
    }

    async setData(data: Bracket) {
        if (data.matchGroups.length !== 1) {
            // todo: throw up like, a slideshow of groups? maybe something for another piece of code to handle
            throw new Error(`Rendering swiss groups requires only one bracket group to be present! (Found ${data.matchGroups.length})`);
        }

        const matchGroup = data.matchGroups[0];
        const switchingBrackets = matchGroup.id !== this.activeBracketId || data.roundNumber !== this.activeRoundNumber;
        if (switchingBrackets) {
            await this.hide();
        }

        this.activeBracketId = matchGroup.id;
        this.activeRoundNumber = data.roundNumber;

        const drawTeamName = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Datum) => MatchTeam) => {
            const that = this;
            return elem
                .append('div')
                .classed('match-row__team-name', true)
                .classed(`match-row__${position}-team-name`, true)
                .each(function (d) {
                    const teamData = team(d);
                    that.animator.setTeamName(
                        this,
                        '',
                        that.formatter.formatTeamName(teamData.name),
                        teamData.isDisqualified,
                        BracketType.SWISS);
                });
        };

        const drawScore = (elem: d3.Selection<HTMLDivElement, Match, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Match) => MatchTeam) => {
            const that = this;
            return elem
                .append('div')
                .classed('match-row__score-wrapper', true)
                .append('div')
                .classed('match-row__score', true)
                .classed(`match-row__${position}-score`, true)
                .each(function (d) {
                    const teamData = team(d);
                    that.animator.setScore(
                        this,
                        0,
                        teamData.score ?? NaN,
                        that.formatter.formatScore(teamData, BracketType.SWISS, d.state),
                        teamData.isDisqualified,
                        BracketType.SWISS);
                });
        };

        const updateTeamName = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Datum) => MatchTeam) => {
            const that = this;
            return elem
                .select(`.match-row__${position}-team-name`)
                .each(function (d) {
                    const currentText = (this as HTMLElement).textContent ?? '';
                    const teamData = team(d);
                    const newText = that.formatter.formatTeamName(teamData.name);
                    if (currentText !== newText) {
                        that.animator.animateTeamNameUpdate(
                            this as HTMLElement,
                            currentText,
                            newText,
                            teamData.isDisqualified,
                            BracketType.SWISS);
                    }
                });
        };

        const updateScore = (elem: d3.Selection<BaseType, Match, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Match) => MatchTeam) => {
            const that = this;
            return elem
                .select(`.match-row__${position}-score`)
                .each(function (d) {
                    const oldFormattedScore = (this as HTMLElement).textContent ?? '';
                    const teamData = team(d);
                    const newFormattedScore = that.formatter.formatScore(teamData, BracketType.SWISS, d.state);
                    if (oldFormattedScore !== newFormattedScore) {
                        that.animator.animateScoreUpdate(
                            this as HTMLElement,
                            parseInt(oldFormattedScore),
                            teamData.score ?? NaN,
                            newFormattedScore,
                            teamData.isDisqualified,
                            BracketType.SWISS
                        );
                    }
                });
        };

        this.element
            .selectAll('div.match-row-wrapper')
            .data(matchGroup.matches, datum => (datum as Match).id)
            .join(
                enter => enter
                    .append('div')
                    .classed('match-row-wrapper', true)
                    .append('div')
                    .classed('match-row', true)
                    .call(drawTeamName, 'top', d => d.topTeam)
                    .call(elem => {
                        elem
                            .append('div')
                            .classed('match-row__scores', true)
                            .call(drawScore, 'top', d => d.topTeam)
                            .call(drawScore, 'bottom', d => d.bottomTeam)
                    })
                    .call(drawTeamName, 'bottom', d => d.bottomTeam),
                update => update
                    .call(updateTeamName, 'top', d => d.topTeam)
                    .call(updateScore, 'top', d => d.topTeam)
                    .call(updateTeamName, 'bottom', d => d.bottomTeam)
                    .call(updateScore, 'bottom', d => d.bottomTeam)
            )

        const node = this.getElement();
        if (switchingBrackets) {
            this.scroller.initScrollMask();
            this.animator.swissAnimator.beforeReveal(node, this);
            node.style.visibility = 'visible';
            await this.animator.swissAnimator.reveal(node, this);
        }
        this.scroller.start();
    }
}
