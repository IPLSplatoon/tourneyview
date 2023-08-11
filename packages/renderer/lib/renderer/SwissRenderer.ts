import * as d3 from 'd3';
import { TextFormatter } from '../formatter/TextFormatter';
import { Bracket, Match } from '@tourneyview/common';
import { Autoscroller } from './Autoscroller';
import { BracketRenderer } from '../types/renderer';

type SwissRendererOpts = {
    formatter: TextFormatter
    minRowHeight?: number
    rowGap?: number
    useScrollMask?: boolean
};

export class SwissRenderer implements BracketRenderer {
    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;

    private readonly width: number;
    private readonly height: number;
    private readonly rowHeight: number;
    private readonly rowGap: number;

    private readonly formatter: TextFormatter;
    private readonly scroller: Autoscroller;

     constructor(width: number, height: number, opts: SwissRendererOpts) {
         this.width = width;
         this.height = height;
         this.formatter = opts.formatter;

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

     setData(data: Bracket) {
         if (data.matchGroups.length !== 1) {
             // todo: throw up like, a slideshow of groups? maybe something for another piece of code to handle
             throw new Error(`Rendering swiss groups requires only one bracket group to be present! (Found ${data.matchGroups.length})`);
         }

         const matchGroup = data.matchGroups[0];

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

         this.element
             .selectAll('div.match-row')
             .data(matchGroup.matches, datum => (datum as Match).id)
             .join(
                 enter => enter.append('div')
                     .classed('match-row', true)
                     .call(drawTeamName, 'top', d => d.topTeam.name)
                     .call(drawScore, 'top', d => d.topTeam.score)
                     .call(drawScore, 'bottom', d => d.bottomTeam.score)
                     .call(drawTeamName, 'bottom', d => d.bottomTeam.name)
             )

         const node = this.element.node()!;
         if (node.scrollHeight > node.clientHeight) {
             this.scroller.start();
         } else {
             this.scroller.stop();
         }
     }
}
