import * as d3 from 'd3';
import { D3EliminationAnimator } from './D3EliminationAnimator';
import { D3SwissAnimator } from './D3SwissAnimator';
import { BracketType } from '@tourneyview/common';
import { BaseBracketAnimator } from '../BaseBracketAnimator';
import { D3RoundRobinAnimator } from './D3RoundRobinAnimator';

export class D3BracketAnimator extends BaseBracketAnimator {
    constructor() {
        super(new D3EliminationAnimator(), new D3SwissAnimator(), new D3RoundRobinAnimator());
    }

    setScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, isDisqualified: boolean): void {
        element.innerText = formattedNewValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }

    animateScoreUpdate(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, isDisqualified: boolean, bracketType: BracketType): void {
        const transformFunc = bracketType === BracketType.SWISS || bracketType === BracketType.ROUND_ROBIN ? 'translateY' : 'translateX';
        const transformAmount = transformFunc === 'translateY' ? element.getBoundingClientRect().height : element.getBoundingClientRect().width;
        const direction = isNaN(oldValue) || oldValue < newValue ? -1 : 1;
        const selection = d3.select(element);
        const that = this;
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

                    that.setDisqualifiedClass(this, isDisqualified);
                })
                .transition()
                .ease(d3.easeCubicOut)
                .style('transform', `${transformFunc}(0px)`));
    }

    setTeamName(element: HTMLElement, oldValue: string, newValue: string, isDisqualified: boolean): void {
        element.innerText = newValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }

    animateTeamNameUpdate(element: HTMLElement, oldValue: string, newValue: string, isDisqualified: boolean): void {
        const selection = d3.select(element);
        const that = this;
        selection
            .call(elem => elem
                .transition()
                .duration(250)
                .ease(d3.easeLinear)
                .style('opacity', '0')
                .on('end', function() {
                    d3.select(this).text(newValue);
                    that.setDisqualifiedClass(this, isDisqualified);
                })
                .transition()
                .ease(d3.easeLinear)
                .style('opacity', '1'));
    }
}
