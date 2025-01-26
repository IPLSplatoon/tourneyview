import * as d3 from 'd3';
import { BracketAnimationOpts, SwissAnimator } from '../../types/animator';
import { SwissRenderer } from '../../renderer/SwissRenderer';

export class D3SwissAnimator implements SwissAnimator {
    beforeHide(): void {

    }

    beforeReveal(element: HTMLElement): void {
        const selection = d3.select(element);
        selection
            .style('opacity', '1');
        selection
            .selectAll('div.match-cell')
            .interrupt()
            .style('opacity', '0')
            .style('transform', 'scale(0.9)');
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
        const delay = opts.delay ?? 0;
        const columnCount = window.getComputedStyle(element.children[0]).gridTemplateColumns.split(' ').length;
        const halfColumnCount = Math.floor(columnCount / 2);
        if (columnCount % 2 === 0) {
            return selection
                .selectAll('div.match-cell')
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .style('transform', 'translateX(0px)')
                .delay((_, i) => {
                    const indexInRow = i % columnCount;
                    if (indexInRow >= halfColumnCount) {
                        return delay + (Math.abs(halfColumnCount - indexInRow) * 50);
                    } else {
                        return delay + ((halfColumnCount - 1 - indexInRow) * 50);
                    }
                })
                .end();
        } else {
            return selection
                .selectAll('div.match-cell')
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .style('transform', 'translateX(0px)')
                .delay((_, i) => delay + (Math.abs(halfColumnCount - (i % columnCount)) * 50))
                .end();
        }
    }
}
