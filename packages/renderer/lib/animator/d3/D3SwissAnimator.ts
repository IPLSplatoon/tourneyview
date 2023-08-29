import * as d3 from 'd3';
import { SwissAnimator } from '../../types/animator';

export class D3SwissAnimator implements SwissAnimator {
    beforeHide(): void {

    }

    beforeReveal(element: HTMLElement): void {
        d3.select(element)
            .style('opacity', '1')
            .selectAll('div.match-row')
            .style('opacity', '0');
    }

    async hide(element: HTMLElement): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end()
    }

    async reveal(element: HTMLElement): Promise<void> {
        const selection = d3.select(element);

        return selection
            .selectAll('div.match-row')
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '1')
            .delay((d, i) => i * 50)
            .end();
    }
}
