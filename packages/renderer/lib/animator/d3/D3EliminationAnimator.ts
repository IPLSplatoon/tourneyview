import { BracketAnimationOpts, EliminationAnimator } from '../../types/animator';
import * as d3 from 'd3';
import { HierarchyPointLink, HierarchyPointNode } from 'd3';
import { EliminationRenderer } from '../../renderer/EliminationRenderer';
import { Match } from '@tourneyview/common';

export class D3EliminationAnimator implements EliminationAnimator {
    beforeHide() {

    }

    async hide(element: HTMLElement, opts: BracketAnimationOpts<EliminationRenderer>): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .delay(opts.delay ?? 0)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end()
    }

    beforeReveal(element: HTMLElement): void {
        const selection = d3.select(element);
        selection
            .style('opacity', '1');
        selection
            .selectAll('div.match-cell')
            .interrupt()
            .style('opacity', '0')
            .style('transform', 'translateX(-10px)');
        selection
            .selectAll('.round-label, .elimination-renderer__bracket-title')
            .interrupt()
            .style('opacity', '0')
        selection
            .selectAll('.bracket-link')
            .interrupt()
            .style('stroke-dashoffset', '-1');
    }

    async reveal(element: HTMLElement, opts: BracketAnimationOpts<EliminationRenderer>): Promise<void> {
        const selection = d3.select(element);
        const depth = opts.renderer.getBracketDepth();
        const delay = opts.delay ?? 0;

        await Promise.all([
            selection
                .selectAll('div.match-cell')
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .style('transform', 'translateX(0px)')
                .delay(d => delay + (depth - (d as HierarchyPointNode<Match>).depth) * 200)
                .end(),
            selection
                .selectAll('.round-label, .elimination-renderer__bracket-title')
                .transition()
                .duration(350)
                .delay(delay)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .delay(function() { return delay + Number((this as HTMLElement).dataset.roundIndex ?? 0) * 200 })
                .end(),
            selection
                .selectAll('.bracket-link')
                .transition()
                .duration(750)
                .delay(delay)
                .ease(d3.easeCubicInOut)
                .style('stroke-dashoffset', '0')
                .delay(d => (depth - (d as HierarchyPointLink<Match>).source.depth) * 300 + 100 + delay)
                .end()
        ]).catch(() => {});
    }
}
