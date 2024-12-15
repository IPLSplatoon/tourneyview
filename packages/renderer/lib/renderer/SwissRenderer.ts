import * as d3 from 'd3';
import { BaseType } from 'd3';
import { TextFormatter } from '../formatter/TextFormatter';
import { Bracket, BracketType, Match, MatchState, MatchTeam } from '@tourneyview/common';
import { BracketTypeRenderer } from '../types/renderer';
import { BaseBracketAnimator } from '../animator/BaseBracketAnimator';
import { PublicBracketAnimationOpts } from '../types/animator';

export type SwissRendererCellCreationCallback = (element: d3.Selection<HTMLDivElement, Match, HTMLDivElement, unknown>) => void;
export type SwissRendererCellUpdateCallback = (element: d3.Selection<BaseType, Match, HTMLDivElement, unknown>) => void;

export type SwissRendererOpts = {
    formatter: TextFormatter
    animator: BaseBracketAnimator
    cellWidth?: number
    cellHeight?: number
    columnGap?: number
    rowGap?: number
    useScrollMask?: boolean
    onCellCreation?: SwissRendererCellCreationCallback
    onCellUpdate?: SwissRendererCellUpdateCallback
    maxScale?: number
};

export class SwissRenderer extends BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [BracketType.SWISS];

    private readonly wrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly cellWidth: number;
    private readonly cellHeight: number;
    private readonly columnGap: number;
    private readonly rowGap: number;
    private readonly onCellCreation?: SwissRendererCellCreationCallback;
    private readonly onCellUpdate?: SwissRendererCellUpdateCallback;

    private readonly formatter: TextFormatter;
    private readonly animator: BaseBracketAnimator;

    private activeBracketId: string | null;
    private activeRoundNumber?: number;

    constructor(opts: SwissRendererOpts) {
        super();

        this.formatter = opts.formatter;
        this.animator = opts.animator;
        this.activeBracketId = null;

        this.cellWidth = opts.cellWidth ?? 250;
        this.cellHeight = opts.cellHeight ?? 65;
        this.rowGap = opts.rowGap ?? 5;
        this.columnGap = opts.columnGap ?? 5;
        this.onCellCreation = opts.onCellCreation;
        this.onCellUpdate = opts.onCellUpdate;

        this.wrapper = d3
            .create('div')
            .classed('swiss-renderer__wrapper', true);
        this.element = this.wrapper
            .append('div')
            .classed('swiss-renderer', true)
            .style('grid-auto-rows', `${(this.cellHeight)}px`)
            .style('grid-template-columns', `repeat(auto-fill, ${this.cellWidth}px)`)
            .style('column-gap', `${this.columnGap}px`)
            .style('row-gap', `${this.rowGap}px`);
    }

    install(target: HTMLElement) {
        const element = this.getElement();
        target.appendChild(element);
    }

    destroy() {
        this.wrapper.remove();
    }

    getElement(): HTMLElement {
        return this.wrapper.node()!;
    }

    async hide(opts: PublicBracketAnimationOpts = {}) {
        if (this.activeBracketId != null) {
            const element = this.getElement();
            this.animator.swissAnimator.beforeHide(element, this);
            await this.animator.swissAnimator.hide(element, { renderer: this, ...opts });
            element.style.visibility = 'hidden';
        }
    }

    beforeReveal(): void {
        const node = this.getElement();
        this.animator.swissAnimator.beforeReveal(node, this);
        node.style.visibility = 'visible';
    }

    async reveal(opts: PublicBracketAnimationOpts = {}): Promise<void> {
        await this.animator.swissAnimator.reveal(this.getElement(), { renderer: this, ...opts });
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

        const setWinnerClasses = (selection: d3.Selection<HTMLDivElement, Match, HTMLDivElement, undefined>) => {
            selection.each(function(d) {
                if (d.topTeam.id == null || d.bottomTeam.id == null) {
                    this.classList.add('missing-team');
                } else {
                    this.classList.remove('missing-team');
                }

                if (d.state !== MatchState.IN_PROGRESS && d.state !== MatchState.COMPLETED) {
                    this.classList.remove('top-team-winner', 'bottom-team-winner', 'in-progress', 'completed');
                } else {
                    if (d.state === MatchState.IN_PROGRESS) {
                        this.classList.add('in-progress');
                        this.classList.remove('bottom-team-winner', 'top-team-winner', 'completed');
                    } else {
                        this.classList.remove('in-progress');

                        if (d.state === MatchState.COMPLETED) {
                            this.classList.add('completed');
                        } else {
                            this.classList.remove('completed');
                        }

                        if (d.topTeam.isWinner) {
                            this.classList.add('top-team-winner');
                        } else {
                            this.classList.remove('top-team-winner');
                        }

                        if (d.bottomTeam.isWinner) {
                            this.classList.add('bottom-team-winner');
                        } else {
                            this.classList.remove('bottom-team-winner');
                        }
                    }
                }
            });
        }

        const drawTeamName = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Datum) => MatchTeam) => {
            const that = this;
            return elem
                .append('div')
                .classed('match-cell__team-name', true)
                .classed(`match-cell__${position}-team-name`, true)
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

        const drawScore = (
            elem: d3.Selection<HTMLDivElement, Match, HTMLElement, unknown>,
            position: 'top' | 'bottom',
            team: (d: Match) => MatchTeam,
            opponentTeam: (d: Match) => MatchTeam
        ) => {
            const that = this;
            return elem
                .append('div')
                .classed('match-cell__score-wrapper', true)
                .append('div')
                .classed('match-cell__score', true)
                .classed(`match-cell__${position}-score`, true)
                .each(function (d) {
                    const teamData = team(d);
                    that.animator.setScore(
                        this,
                        0,
                        teamData.score ?? NaN,
                        that.formatter.formatScore({ 
                            team: teamData,
                            opponentTeam: opponentTeam(d),
                            bracketType: BracketType.SWISS,
                            matchState: d.state
                        }),
                        teamData.isDisqualified,
                        BracketType.SWISS);
                });
        };

        const updateTeamName = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', team: (d: Datum) => MatchTeam) => {
            const that = this;
            return elem
                .select(`.match-cell__${position}-team-name`)
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

        const updateScore = (
            elem: d3.Selection<BaseType, Match, HTMLElement, unknown>, 
            position: 'top' | 'bottom',
            team: (d: Match) => MatchTeam,
            opponentTeam: (d: Match) => MatchTeam
        ) => {
            const that = this;
            return elem
                .select(`.match-cell__${position}-score`)
                .each(function (d) {
                    const oldFormattedScore = (this as HTMLElement).textContent ?? '';
                    const teamData = team(d);
                    const newFormattedScore = that.formatter.formatScore({ 
                        team: teamData,
                        opponentTeam: opponentTeam(d),
                        bracketType: BracketType.SWISS,
                        matchState: d.state
                    });
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
            .selectAll('div.match-cell-wrapper')
            .data(matchGroup.matches, datum => (datum as Match).id)
            .join(
                enter => {
                    const wrapperSelection = enter
                        .append('div')
                        .classed('match-cell-wrapper', true)
                        .call(setWinnerClasses);

                    wrapperSelection
                        .append('div')
                        .classed('match-cell', true)
                        .call(drawTeamName, 'top', d => d.topTeam)
                        .call(drawScore, 'top', d => d.topTeam, d => d.bottomTeam)
                        .call(drawTeamName, 'bottom', d => d.bottomTeam)
                        .call(drawScore, 'bottom', d => d.bottomTeam, d => d.topTeam);

                    return this.onCellCreation ? wrapperSelection.call(this.onCellCreation) : wrapperSelection;
                },
                update => {
                    const selection = update
                        // @ts-ignore
                        .call(setWinnerClasses)
                        .call(updateTeamName, 'top', d => d.topTeam)
                        .call(updateScore, 'top', d => d.topTeam, d => d.bottomTeam)
                        .call(updateTeamName, 'bottom', d => d.bottomTeam)
                        .call(updateScore, 'bottom', d => d.bottomTeam, d => d.topTeam);

                    return this.onCellUpdate ? selection.call(this.onCellUpdate) : selection;
                }
            )

        if (switchingBrackets) {
            this.beforeReveal();
            await this.reveal();
        }
    }
}
