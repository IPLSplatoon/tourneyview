import { BracketAnimator, EliminationBracketAnimator } from '../../types/animator';
import * as d3 from 'd3';
import { D3EliminationBracketAnimator } from './D3EliminationBracketAnimator';

export class D3BracketAnimator implements BracketAnimator {
    public readonly eliminationAnimator: EliminationBracketAnimator;

    constructor() {
        this.eliminationAnimator = new D3EliminationBracketAnimator();
    }

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
}
