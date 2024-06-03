import { BlankGridItem, MatchGridItem, RoundRobinRenderer } from '../../renderer/RoundRobinRenderer';
import { BracketAnimationOpts, RoundRobinAnimator } from '../../types/animator';
import * as d3 from 'd3';

export class D3RoundRobinAnimator implements RoundRobinAnimator {
    beforeHide(): void {

    }

    hide(element: HTMLElement, opts: BracketAnimationOpts<RoundRobinRenderer>): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .delay(opts.delay ?? 0)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end();
    }

    beforeReveal(element: HTMLElement): void {
        d3.selectAll('.round-robin-grid-item')
            .interrupt()
            .style('opacity', '0');
        element.style.opacity = '1';
    }

    reveal(element: HTMLElement, opts: BracketAnimationOpts<RoundRobinRenderer>): Promise<unknown> {
        const selection = d3.select(element);
        const delay = opts.delay ?? 0;

        return Promise.all([
            selection
                .selectAll('.type-blank-blank, .type-team-name')
                .transition()
                .duration(350)
                .delay(delay)
                .ease(d3.easeLinear)
                .style('opacity', '1')
                .end(),
            selection
                .selectAll<HTMLElement, MatchGridItem | BlankGridItem>('.type-match, .type-blank-no-match')
                .transition()
                .duration(350)
                .ease(d3.easeLinear)
                .style('opacity', '1')
                .delay((d) => (d.y + d.x) * 100 + delay)
                .end()
        ]);
    }
}
