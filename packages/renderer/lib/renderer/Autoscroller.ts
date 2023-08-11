import * as d3 from 'd3';
import { ScrollMask } from './ScrollMask';

export class Autoscroller {
    private readonly target: HTMLElement;
    private readonly rowsPerScreen: number;
    private readonly rowHeight: number;
    private readonly rowGap: number;

    private direction: 'up' | 'down';
    private scrollTopTo: number;
    private scrollMask: ScrollMask | null;

    constructor(target: HTMLElement, height: number, rowHeight: number, rowGap: number, useScrollMask: boolean) {
        this.target = target;
        this.rowsPerScreen = Math.floor((height + rowGap) / (rowHeight + rowGap));
        this.rowHeight = rowHeight;
        this.rowGap = rowGap;

        this.direction = 'up';
        this.target.scrollTop = 0;
        this.scrollTopTo = 0;

        this.scrollMask = useScrollMask ? new ScrollMask(target) : null;
        this.scrollMask?.start();
    }

    start() {
        this.scrollMask?.refreshMask();

        const scrollingFinished = this.scrollingFinished();
        if (scrollingFinished) {
            this.direction = this.direction === 'down' ? 'up' : 'down';
        }

        const scrollTopFrom = this.scrollTopTo;
        this.scrollTopTo = this.getNextScrollTop();

        d3.select(this.target)
            .transition('scroll')
            .duration(750)
            .delay(5000)
            .on('end', () => this.start())
            .tween('scroll', () => {
                const i = d3.interpolateNumber(scrollTopFrom, this.scrollTopTo);
                return function(t) {
                    this.scrollTop = i(t);
                }
            });
    }

    stop() {
        d3.select(this.target).interrupt('scroll');
        this.target.scrollTop = 0;
        this.scrollMask?.stop();
    }

    private getNextScrollTop(): number {
        if (this.direction === 'up') {
            return 0;
        } else {
            return Math.min(this.scrollTopTo + (this.rowHeight + this.rowGap) * (this.rowsPerScreen - 1), this.maxScrollTop());
        }
    }

    private scrollingFinished() {
        return (this.direction === 'up' && this.target.scrollTop <= 0)
            || (this.direction === 'down' && Math.abs(this.target.scrollHeight - this.target.clientHeight - this.target.scrollTop) < 1);
    }

    private maxScrollTop() {
        return this.target.scrollHeight - this.target.clientHeight;
    }
}
