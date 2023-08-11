import { EliminationBracketAnimator } from '../../types/animator';
import * as d3 from 'd3';
import { HierarchyPointLink, HierarchyPointNode } from 'd3';
import { EliminationRenderer } from '../../renderer/EliminationRenderer';
import { Match } from '@tourneyview/common';

export class D3EliminationBracketAnimator implements EliminationBracketAnimator {
    beforeHide() {

    }

    async hide(element: HTMLElement): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
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
            .style('opacity', '0')
            .style('transform', 'translateX(-10px)');
        selection
            .selectAll('.round-label, .elimination-renderer__bracket-title')
            .style('opacity', '0')
        selection
            .selectAll('.bracket-link')
            .style('stroke-dashoffset', '-1');
    }

    async reveal(element: HTMLElement, renderer: EliminationRenderer): Promise<void> {
        const selection = d3.select(element);
        const depth = renderer.getBracketDepth();

        await Promise.all([
            selection
                .selectAll('div.match-cell')
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .style('transform', 'translateX(0px)')
                .delay(d => (depth - (d as HierarchyPointNode<Match>).depth) * 200)
                .end(),
            selection
                .selectAll('.round-label, .elimination-renderer__bracket-title')
                .transition()
                .duration(350)
                .ease(d3.easeCubicOut)
                .style('opacity', '1')
                .delay(d => (d as number ?? 0) * 200)
                .end(),
            selection
                .selectAll('.bracket-link')
                .transition()
                .duration(750)
                .ease(d3.easeCubicInOut)
                .style('stroke-dashoffset', '0')
                .delay(d => (depth - (d as HierarchyPointLink<Match>).source.depth) * 300 + 100)
                .end()
        ]);
    }
}
