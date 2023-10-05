import { BlankGridItem, MatchGridItem } from '../../renderer/RoundRobinRenderer';
import { RoundRobinAnimator } from '../../types/animator';
import * as d3 from 'd3';

export class D3RoundRobinAnimator implements RoundRobinAnimator {
    beforeHide(): void {

    }

    hide(element: HTMLElement): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end();
    }

    beforeReveal(element: HTMLElement): void {
        d3.selectAll('.round-robin-grid-item').style('opacity', '0');
        element.style.opacity = '1';
    }

    reveal(element: HTMLElement): Promise<unknown> {
        const selection = d3.select(element);
        return Promise.all([
            selection
                .selectAll('.type-blank-blank, .type-team-name')
                .transition()
                .duration(350)
                .ease(d3.easeLinear)
                .style('opacity', '1')
                .end(),
            selection
                .selectAll<HTMLElement, MatchGridItem | BlankGridItem>('.type-match, .type-blank-no-match')
                .transition()
                .duration(350)
                .ease(d3.easeLinear)
                .style('opacity', '1')
                .delay((d) => (d.y + d.x) * 100)
                .end()
        ]);
    }
}
