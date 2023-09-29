import { Bracket } from '@tourneyview/common';
import { BracketTypeRenderer } from '../types/renderer';
import * as d3 from 'd3';

export class DummyRenderer implements BracketTypeRenderer {
    public static readonly compatibleBracketTypes = [];

    private readonly element: d3.Selection<HTMLDivElement, undefined, null, undefined>;
    private readonly textElement: HTMLElement;

    constructor() {
        this.element = d3
            .create('div')
            .classed('dummy-renderer', true);
        this.textElement = document.createElement('div');
        this.element.append(() => this.textElement);
    }

    async setData(data: Bracket) {
        return this.element
            .transition('fade-out')
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .on('end', () => {
                this.textElement.innerText = `Dummy renderer for bracket type ${data.type}`;
            })
            .transition()
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '1')
            .end();
    }

    hide(): void | Promise<void> {
        return this.element
            .transition('fade-out')
            .duration(350)
            .ease(d3.easeLinear)
            .style('opacity', '0')
            .end();
    }

    install(target: HTMLElement) {
        target.appendChild(this.getElement());
    }

    destroy() {
        this.element.remove();
    }

    getElement(): HTMLElement {
        return this.element.node()!;
    }
}
