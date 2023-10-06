import { Bracket, BracketType, Match, MatchState, MatchTeam } from '@tourneyview/common';
import { BracketTypeRenderer } from '../types/renderer';
import * as d3 from 'd3';
import { TextFormatter } from '../formatter/TextFormatter';
import { BaseBracketAnimator } from '../animator/BaseBracketAnimator';
import uniqBy from 'lodash/uniqBy';
import { Zoomer } from './Zoomer';

export type RoundRobinRendererOpts = {
    formatter: TextFormatter
    animator: BaseBracketAnimator
    rowHeight?: number
    rowWidth?: number
    maxScale?: number
};

export interface MatchGridItem {
    x: number
    y: number
    type: 'match'
    match?: Match
    leftTeam?: MatchTeam
    topTeam?: MatchTeam
    leftTeamScore: string
    topTeamScore: string
}

export interface BlankGridItem {
    x: number
    y: number
    type: 'blank'
    style: 'blank' | 'no-match'
}

export interface TeamNameGridItem {
    type: 'teamName'
    name: string
    side: 'top' | 'left'
    isDisqualified: boolean
}

export type RoundRobinGridItem = MatchGridItem | BlankGridItem | TeamNameGridItem;

export class RoundRobinRenderer extends BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [BracketType.ROUND_ROBIN];

    private readonly wrapper: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly gridElement: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly formatter: TextFormatter;
    private readonly animator: BaseBracketAnimator;

    private readonly rowHeight: number;
    private readonly rowWidth: number;

    private activeBracketId: string | null;
    private activeGridSize?: number;

    private readonly zoomer: Zoomer;

    constructor(opts: RoundRobinRendererOpts) {
        super();

        this.formatter = opts.formatter;
        this.animator = opts.animator;
        this.activeBracketId = null;
        this.rowHeight = opts.rowHeight ?? 45;
        this.rowWidth = opts.rowWidth ?? 125;

        this.wrapper = d3
            .create('div')
            .classed('round-robin-renderer__wrapper', true);

        this.gridElement = this.wrapper
            .append('div')
            .classed('round-robin-renderer', true);

        this.zoomer = new Zoomer(this.wrapper as unknown as d3.Selection<Element, undefined, null, undefined>, this.onZoom.bind(this), opts.maxScale ?? 1.5);
    }

    private onZoom(event: d3.D3ZoomEvent<HTMLElement, never>): void {
        this.gridElement.style('transform', Zoomer.toCSSTransform(event));
    }

    destroy(): void {
        this.zoomer.disconnect();
        this.wrapper.remove();
    }

    getElement(): HTMLElement {
        return this.wrapper.node()!;
    }

    async hide(): Promise<void> {
        if (this.activeBracketId != null) {
            const element = this.getElement();
            this.animator.roundRobinAnimator.beforeHide(element, this);
            await this.animator.roundRobinAnimator.hide(element, this);
            element.style.visibility = 'hidden';
        }
    }

    install(target: HTMLElement): void {
        target.appendChild(this.getElement());
        this.zoomer.recalculateContainerSize();
    }

    async setData(data: Bracket): Promise<void> {
        const element = this.getElement();
        element.style.visibility = 'visible';

        if (data.matchGroups.length !== 1) {
            throw new Error(`Cannot render more (or less) than one match group at once! (Found ${data.matchGroups.length})`);
        }
        const matchGroup = data.matchGroups[0];

        const uniqueTeams = uniqBy(
            matchGroup.matches
                .flatMap(match => [match.bottomTeam, match.topTeam])
                .filter(team => team.id != null && team.name != null),
            team => team.id);

        const gridSize = uniqueTeams.length + 1;
        const doFullUpdate = this.activeGridSize !== gridSize || this.activeBracketId !== matchGroup.id;
        this.activeBracketId = matchGroup.id;
        this.activeGridSize = gridSize;

        if (doFullUpdate) {
            await this.hide();
            this.gridElement.selectChildren().remove();
        }
 
        this.gridElement
            .style('grid-template-rows', `repeat(${gridSize}, ${this.rowHeight}px)`)
            .style('grid-template-columns', `repeat(${gridSize}, ${this.rowWidth}px)`);
        this.zoomer.setContentSize(this.rowWidth * gridSize + (4 * gridSize - 4), this.rowHeight * gridSize + (4 * gridSize - 4));

        const gridItems: RoundRobinGridItem[] = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (y === 0 && x === 0) {
                    gridItems.push({ type: 'blank', style: 'blank', x, y });
                } else if (y === 0) {
                    const team = uniqueTeams[x - 1];
                    gridItems.push({
                        type: 'teamName',
                        side: 'top',
                        name: this.formatter.formatTeamName(team.name),
                        isDisqualified: team.isDisqualified
                    });
                } else if (x === 0) {
                    const team = uniqueTeams[y - 1];
                    gridItems.push({
                        type: 'teamName',
                        side: 'left',
                        name: this.formatter.formatTeamName(team.name),
                        isDisqualified: team.isDisqualified
                    });
                } else if (y === x) {
                    gridItems.push({
                        x,
                        y,
                        type: 'blank',
                        style: 'no-match'
                    })
                } else {
                    const leftTeam = uniqueTeams[y - 1];
                    const topTeam = uniqueTeams[x - 1];
                    const match = matchGroup.matches.find(match => 
                        (match.topTeam.id === leftTeam.id || match.bottomTeam.id === leftTeam.id) 
                        && (match.topTeam.id === topTeam.id || match.bottomTeam.id === topTeam.id));

                    const flipTeams = leftTeam.id === match?.bottomTeam.id;
                    const leftMatchTeam = flipTeams ? match?.bottomTeam : match?.topTeam;
                    const topMatchTeam = flipTeams ? match?.topTeam : match?.bottomTeam;

                    gridItems.push({
                        type: 'match',
                        x,
                        y,
                        match,
                        leftTeam: leftMatchTeam,
                        topTeam: topMatchTeam,
                        leftTeamScore: this.formatter.formatScore(leftMatchTeam?.score, leftMatchTeam?.isDisqualified ?? false, BracketType.ROUND_ROBIN, match?.state ?? MatchState.UNKNOWN),
                        topTeamScore: this.formatter.formatScore(topMatchTeam?.score, topMatchTeam?.isDisqualified ?? false, BracketType.ROUND_ROBIN, match?.state ?? MatchState.UNKNOWN)
                    })
                }
            } 
        }

        const that = this;
        this.gridElement
            .selectAll('div.round-robin-grid-item')
            .data(gridItems)
            .join(
                enter => enter
                    .append('div')
                    .classed('round-robin-grid-item', true)
                    .each(function(d) {
                        if (d.type === 'blank') {
                            this.classList.add('type-blank', `type-blank-${d.style}`);
                        } else if (d.type === 'teamName') {
                            this.classList.add('type-team-name', `type-team-name-${d.side}`)
                            that.animator.setTeamName(
                                this,
                                '',
                                d.name,
                                d.isDisqualified,
                                BracketType.ROUND_ROBIN);
                        } else {
                            this.classList.add(`type-${d.type}`);
                        }

                        if (d.type === 'match') {
                            this.dataset.xPosition = d.x.toString();
                            this.dataset.yPosition = d.y.toString();
                            that.insertScoreLayout(this, d);
                            that.setWinnerClasses(this, d);
                        }
                    }),
                update => update
                    .each(function(d) {
                        that.setWinnerClasses(<HTMLElement>this, d);

                        if (d.type === 'match') {
                            that.updateScore(<HTMLElement>this, d);
                        } else if (d.type === 'teamName') {
                            const currentValue = (<HTMLElement>this).innerText;
                            if (currentValue !== d.name) {
                                that.animator.animateTeamNameUpdate(
                                    <HTMLElement>this,
                                    currentValue,
                                    d.name,
                                    d.isDisqualified,
                                    BracketType.ROUND_ROBIN);
                            }
                        }
                    })
            );

        if (doFullUpdate) {
            const element = this.getElement();
            this.animator.roundRobinAnimator.beforeReveal(element, this);
            element.style.visibility = 'visible';
            await this.animator.roundRobinAnimator.reveal(element, this);
        }
    }

    private setWinnerClasses(element: HTMLElement, item: RoundRobinGridItem) {
        if (item.type !== 'match' || item.match?.state !== MatchState.IN_PROGRESS && item.match?.state !== MatchState.COMPLETED) {
            element.classList.remove('left-team-winner', 'top-team-winner', 'in-progress');
        } else {
            if (item.match?.state === MatchState.IN_PROGRESS) {
                element.classList.add('in-progress');
            } else if (item.match?.state === MatchState.COMPLETED && item.leftTeam?.score != null && item.topTeam?.score != null) {
                element.classList.remove('in-progress');

                if (item.leftTeam.score > item.topTeam.score) {
                    element.classList.remove('top-team-winner');
                    element.classList.add('left-team-winner');
                } else {
                    element.classList.remove('left-team-winner');
                    element.classList.add('top-team-winner');
                }
            }
        }
    }

    private updateScore(element: Element, datum: MatchGridItem): void {
        ['left', 'top'].forEach(team => {
            const scoreElem = element.querySelector<HTMLElement>(`.${team}-score-wrapper > .team-score`)!;
            const currentScore = parseInt(scoreElem.textContent ?? '');
            const teamData = team === 'left' ? datum.leftTeam : datum.topTeam;
            const newScore = teamData?.score ?? NaN;
            if (currentScore !== newScore && !(isNaN(currentScore) && (isNaN(newScore) || teamData?.isDisqualified))) {
                this.animator.animateScoreUpdate(
                    scoreElem,
                    currentScore,
                    newScore,
                    team === 'left' ? datum.leftTeamScore : datum.topTeamScore,
                    teamData?.isDisqualified ?? false,
                    BracketType.ROUND_ROBIN);
            }
        });
    }

    private insertScoreWrapper(selection: d3.Selection<HTMLDivElement, unknown, null, undefined>, score: string, team: 'left' | 'top', teamData?: MatchTeam): void {
        const animator = this.animator;
        selection
            .append('div')
            .classed('score-wrapper', true)
            .classed(`${team}-score-wrapper`, true)
            .append('div')
            .classed('team-score', true)
            .each(function (d) {
                animator.setScore(
                    this,
                    0,
                    teamData?.score ?? NaN,
                    score,
                    teamData?.isDisqualified ?? false,
                    BracketType.ROUND_ROBIN);
            });
    }

    private insertScoreLayout(element: Element, datum: MatchGridItem): void {
        d3.select(element)
            .append('div')
            .classed('score-layout', true)
            .call(this.insertScoreWrapper.bind(this), datum.leftTeamScore, 'left', datum.leftTeam)
            .call((element) => {
                element
                    .append('div')
                    .classed('score-separator', true)
            })
            .call(this.insertScoreWrapper.bind(this), datum.topTeamScore, 'top', datum.topTeam);
    }
}
