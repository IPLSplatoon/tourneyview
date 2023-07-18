import { BracketAnimator } from '../types/animator';
import * as d3 from 'd3';
import { HierarchyPointLink, HierarchyPointNode } from 'd3';
import { Match } from '@tourneyview/common';
import { EliminationRenderer } from '../renderer/EliminationRenderer';

export class D3BracketAnimator implements BracketAnimator {
    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void {
        const width = element.getBoundingClientRect().width;
        const direction = isNaN(oldValue) || oldValue < newValue ? -1 : 1;
        const selection = d3.select(element);
        selection
            .call(elem => elem
                .transition()
                .duration(250)
                .ease(d3.easeCubicIn)
                .style('transform', `translateX(${width * direction}px)`)
                .on('end', function() {
                    d3.select(this)
                        .text(formattedNewValue)
                        .style('transform', `translateX(${-width * direction}px)`);
                })
                .transition()
                .ease(d3.easeCubicOut)
                .style('transform', 'translateX(0px)'));
    }

    updateText(element: HTMLElement, oldValue: string, newValue: string): void {
        const selection = d3.select(element);
        selection
            .call(elem => elem
                .transition()
                .duration(250)
                .ease(d3.easeLinear)
                .style('opacity', '0')
                .on('end', function() {
                    d3.select(this).text(newValue)
                })
                .transition()
                .ease(d3.easeLinear)
                .style('opacity', '1'));
    }

    async hideEliminationBracket(element: HTMLElement): Promise<void> {
        return d3.select(element)
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end()
    }

    beforeEliminationBracketReveal(element: HTMLElement): void {
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

    async revealEliminationBracket(element: HTMLElement, renderer: EliminationRenderer): Promise<void> {
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
