import * as d3 from 'd3';
import { TextFormatter } from '../formatter/TextFormatter';
import { Bracket, BracketType, Match } from '@tourneyview/common';
import { Autoscroller } from './Autoscroller';
import { BracketRenderer } from '../types/renderer';
import { BracketAnimator } from '../types/animator';
import { DummyBracketAnimator } from '../animator/dummy/DummyBracketAnimator';
import { BaseType } from 'd3';

type SwissRendererOpts = {
    formatter: TextFormatter
    animator?: BracketAnimator
    minRowHeight?: number
    rowGap?: number
    useScrollMask?: boolean
};

export class SwissRenderer implements BracketRenderer {
    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    public readonly width: number;
    public readonly height: number;
    private readonly rowHeight: number;
    private readonly rowGap: number;

    private readonly formatter: TextFormatter;
    private readonly scroller: Autoscroller;
    private readonly animator: BracketAnimator;

    private activeBracketId: string | null;

     constructor(width: number, height: number, opts: SwissRendererOpts) {
         this.width = width;
         this.height = height;
         this.formatter = opts.formatter;
         this.animator = opts.animator ?? new DummyBracketAnimator();
         this.activeBracketId = null;

         const minRowHeight = opts.minRowHeight ?? 50;
         this.rowGap = opts.rowGap ?? 5;
         this.rowHeight = Math.round((height + this.rowGap) / Math.floor((height + this.rowGap) / (minRowHeight + this.rowGap))) - this.rowGap;

         this.element = d3
             .create('div')
             .classed('swiss-renderer', true)
             .style('width', `${width}px`)
             .style('height', `${height}px`)
             .style('grid-auto-rows', `${(this.rowHeight)}px`)
             .style('row-gap', `${this.rowGap}px`);

         this.scroller = new Autoscroller(this.element.node()!, this.height, this.rowHeight, this.rowGap, opts.useScrollMask ?? false);
     }

     destroy() {
         this.element.remove();
     }

     getElement(): HTMLElement {
         return this.element.node()!;
     }

     async setData(data: Bracket) {
         if (data.matchGroups.length !== 1) {
             // todo: throw up like, a slideshow of groups? maybe something for another piece of code to handle
             throw new Error(`Rendering swiss groups requires only one bracket group to be present! (Found ${data.matchGroups.length})`);
         }

         const matchGroup = data.matchGroups[0];
         const switchingBrackets = matchGroup.id !== this.activeBracketId;
         if (this.activeBracketId != null && switchingBrackets) {
             const element = this.getElement();
             this.animator.swissAnimator.beforeHide(element, this);
             await this.animator.swissAnimator.hide(element, this);
             this.scroller.stop();
             element.style.visibility = 'hidden';
         }

         this.activeBracketId = matchGroup.id;

         const drawTeamName = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', text: (d: Datum) => string | undefined | null) =>
             elem
                 .append('div')
                 .classed('match-row__team-name', true)
                 .classed(`match-row__${position}-team-name`, true)
                 .text(d => this.formatter.formatTeamName(text(d)));

         const drawScore = <Datum>(elem: d3.Selection<HTMLDivElement, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', score: (d: Datum) => number | undefined | null) =>
             elem
                 .append('div')
                 .classed('match-row__score-wrapper', true)
                 .append('div')
                 .classed('match-row__score', true)
                 .classed(`match-row__${position}-score`, true)
                 .text(d => this.formatter.formatScore(score(d)));

         const updateTeamName = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', text: (d: Datum) => string | undefined | null) => {
             const that = this;
             return elem
                 .select(`.match-row__${position}-team-name`)
                 .each(function(d) {
                     const currentText = (this as HTMLElement).textContent ?? '';
                     const newText = that.formatter.formatTeamName(text(d));
                     if (currentText !== newText) {
                         that.animator.updateText(this as HTMLElement, currentText, newText, BracketType.SWISS);
                     }
                 });
         };

         const updateScore = <Datum>(elem: d3.Selection<BaseType, Datum, HTMLElement, unknown>, position: 'top' | 'bottom', score: (d: Datum) => number | undefined | null) => {
             const that = this;
             return elem
                 .select(`.match-row__${position}-score`)
                 .each(function(d) {
                     const currentScore = parseInt((this as HTMLElement).textContent ?? '');
                     const newScore = score(d) ?? NaN;
                     if (currentScore !== newScore && !(isNaN(currentScore) && isNaN(newScore))) {
                         that.animator.updateScore(
                             this as HTMLElement,
                             currentScore,
                             newScore,
                             that.formatter.formatScore(newScore),
                             BracketType.SWISS
                         );
                     }
                 });
         };

         this.element
             .selectAll('div.match-row')
             .data(matchGroup.matches, datum => (datum as Match).id)
             .join(
                 enter => enter.append('div')
                     .classed('match-row', true)
                     .call(drawTeamName, 'top', d => d.topTeam.name)
                     .call(drawScore, 'top', d => d.topTeam.score)
                     .call(drawScore, 'bottom', d => d.bottomTeam.score)
                     .call(drawTeamName, 'bottom', d => d.bottomTeam.name),
                 update => update
                     .call(updateTeamName, 'top', d => d.topTeam.name)
                     .call(updateScore, 'top', d => d.topTeam.score)
                     .call(updateTeamName, 'bottom', d => d.bottomTeam.name)
                     .call(updateScore, 'bottom', d => d.bottomTeam.score)
             )

         const node = this.element.node()!;
         const useScroller = node.scrollHeight > node.clientHeight;

         if (useScroller) {
             this.scroller.initScrollMask();
         }
         if (switchingBrackets) {
             this.animator.swissAnimator.beforeReveal(node, this);
             node.style.visibility = 'visible';
             await this.animator.swissAnimator.reveal(node, this);
         }
         if (useScroller) {
             this.scroller.start();
         }
     }
}
