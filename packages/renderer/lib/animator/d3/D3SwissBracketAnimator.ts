import * as d3 from 'd3';
import { SwissBracketAnimator } from '../../types/animator';
import { SwissRenderer } from '../../renderer/SwissRenderer';

export class D3SwissBracketAnimator implements SwissBracketAnimator {
    beforeHide(): void {

    }

    beforeReveal(element: HTMLElement, renderer: SwissRenderer): void {
        element.style.opacity = '1';

        const visibleElements: HTMLElement[] = [];
        const rect = element.getBoundingClientRect();

        for (const child of Array.from(element.children)) {
            if (child.getBoundingClientRect().top + element.scrollTop - rect.top <= renderer.height) {
                visibleElements.push(child as HTMLElement);
            } else {
                break;
            }
        }

        visibleElements.forEach(el => {
            el.style.opacity = '0';
            el.dataset.reveal = String(true);
        });
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
            .selectAll('div.match-row[data-reveal="true"]')
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '1')
            .delay((d, i) => i * 50)
            .end();
    }
}
