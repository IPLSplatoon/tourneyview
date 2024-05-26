import * as d3 from 'd3';
import { BracketAnimationOpts, SwissAnimator } from '../../types/animator';
import { SwissRenderer } from '../../renderer/SwissRenderer';

export class D3SwissAnimator implements SwissAnimator {
    beforeHide(): void {

    }

    beforeReveal(element: HTMLElement): void {
        d3.select(element)
            .style('opacity', '1')
            .selectAll('div.match-row')
            .interrupt()
            .style('opacity', '0');
    }

    async hide(element: HTMLElement, opts: BracketAnimationOpts<SwissRenderer>): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .delay(opts.delay ?? 0)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end()
    }

    async reveal(element: HTMLElement, opts: BracketAnimationOpts<SwissRenderer>): Promise<void> {
        const selection = d3.select(element);

        return selection
            .selectAll('div.match-row')
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '1')
            .delay((d, i) => i * 50 + (opts.delay ?? 0))
            .end();
    }
}
