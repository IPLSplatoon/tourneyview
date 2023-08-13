import { BracketAnimator, EliminationBracketAnimator, SwissBracketAnimator } from '../../types/animator';
import * as d3 from 'd3';
import { D3EliminationBracketAnimator } from './D3EliminationBracketAnimator';
import { D3SwissBracketAnimator } from './D3SwissBracketAnimator';
import { BracketType } from '@tourneyview/common';

export class D3BracketAnimator implements BracketAnimator {
    public readonly eliminationAnimator: EliminationBracketAnimator;
    public readonly swissAnimator: SwissBracketAnimator;

    constructor() {
        this.eliminationAnimator = new D3EliminationBracketAnimator();
        this.swissAnimator = new D3SwissBracketAnimator();
    }

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, bracketType: BracketType): void {
        const transformFunc = bracketType === BracketType.SWISS ? 'translateY' : 'translateX';
        const transformAmount = transformFunc === 'translateY' ? element.getBoundingClientRect().height : element.getBoundingClientRect().width;
        const direction = isNaN(oldValue) || oldValue < newValue ? -1 : 1;
        const selection = d3.select(element);
        selection
            .call(elem => elem
                .transition()
                .duration(250)
                .ease(d3.easeCubicIn)
                .style('transform', `${transformFunc}(${transformAmount * direction}px)`)
                .on('end', function() {
                    d3.select(this)
                        .text(formattedNewValue)
                        .style('transform', `${transformFunc}(${-transformAmount * direction}px)`);
                })
                .transition()
                .ease(d3.easeCubicOut)
                .style('transform', `${transformFunc}(0px)`));
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
