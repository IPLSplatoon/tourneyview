import * as d3 from 'd3';
import { ScrollMask } from './ScrollMask';

export class Autoscroller {
    private readonly target: HTMLElement;
    private readonly targetSelection: d3.Selection<HTMLElement, unknown, null, undefined>;
    private readonly rowGap: number;
    private readonly rowHeight: number;

    private rowsPerScreen?: number;
    private direction: 'up' | 'down';
    private scrollTopTo: number;
    private scrollMask: ScrollMask | null;
    private started: boolean;
    private targetHeight: number;

    constructor(target: HTMLElement, rowHeight: number, rowGap: number, useScrollMask: boolean) {
        this.target = target;
        this.targetSelection = d3.select(target);
        this.rowHeight = rowHeight;
        this.rowGap = rowGap;

        this.direction = 'up';
        this.target.scrollTop = 0;
        this.scrollTopTo = 0;
        this.started = false;

        this.scrollMask = useScrollMask ? new ScrollMask(target) : null;
        this.initScrollMask();

        this.targetHeight = 0;
    }

    setHeights(height: number, rowsPerScreen: number) {
        this.resetPosition();
        this.targetHeight = height;
        this.rowsPerScreen = rowsPerScreen;
        this.start();
    }

    initScrollMask() {
        if (this.targetIsScrollable()) {
            this.scrollMask?.start();
        }
    }

    start() {
        if (this.started) {
            return;
        }
        if (!this.targetIsScrollable()) {
            this.scrollMask?.stop();
            return;
        }

        this.initScrollMask();
        this.started = true;

        this.scroll();
    }

    private scroll() {
        const scrollingFinished = this.scrollingFinished();
        if (scrollingFinished) {
            this.direction = this.direction === 'down' ? 'up' : 'down';
        }

        const scrollTopFrom = this.scrollTopTo;
        const scrollTopTo = this.getNextScrollTop();
        this.scrollTopTo = scrollTopTo;

        this.targetSelection
            .transition('scroll')
            .duration(750)
            .delay(5000)
            .on('end', () => {
                this.scroll();
            })
            .tween('scroll', () => {
                const i = d3.interpolateNumber(scrollTopFrom, scrollTopTo);
                return function(t) {
                    this.scrollTop = i(t);
                }
            });
    }

    private resetPosition() {
        this.targetSelection.interrupt('scroll');
        this.target.scrollTop = 0;
        this.scrollTopTo = 0;
        this.direction = 'up';
        this.started = false;
    }

    stop() {
        this.resetPosition();
        this.scrollMask?.stop();
    }

    targetIsScrollable(): boolean {
        return this.rowsPerScreen != null && this.target.scrollHeight > this.targetHeight;
    }

    private getNextScrollTop(): number {
        if (this.direction === 'up') {
            return 0;
        } else {
            if (this.rowsPerScreen == null) {
                throw new Error('Tried starting an autoscroller without telling it the target element\'s height first');
            }

            return Math.min(this.scrollTopTo + (this.rowHeight + this.rowGap) * (this.rowsPerScreen - 1), this.maxScrollTop());
        }
    }

    private scrollingFinished() {
        return (this.direction === 'up' && this.target.scrollTop <= 0)
            || (this.direction === 'down' && Math.abs(this.target.scrollHeight - this.targetHeight - this.target.scrollTop) < 1);
    }

    private maxScrollTop() {
        return this.target.scrollHeight - this.targetHeight;
    }
}
