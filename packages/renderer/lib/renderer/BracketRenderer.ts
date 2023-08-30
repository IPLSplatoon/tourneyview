import { BracketTypeRenderer } from '../types/renderer';
import { BracketAnimator } from '../types/animator';
import { TextFormatter } from '../formatter/TextFormatter';
import { EliminationRenderer, EliminationRendererOpts } from './EliminationRenderer';
import { SwissRenderer, SwissRendererOpts } from './SwissRenderer';
import { Bracket, BracketType } from '@tourneyview/common';
import { DummyBracketAnimator } from '../animator/dummy/DummyBracketAnimator';
import { BaseTextFormatter } from '../formatter/BaseTextFormatter';
import * as d3 from 'd3';
import { DummyRenderer } from './DummyRenderer';

type WithoutCommonOpts<T> = Omit<T, 'animator' | 'formatter'>;
export type BracketRendererOpts = {
    animator?: BracketAnimator
    formatter?: TextFormatter
    eliminationOpts?: WithoutCommonOpts<EliminationRendererOpts>
    swissOpts?: WithoutCommonOpts<SwissRendererOpts>
};

export class BracketRenderer {
    private activeRenderer: BracketTypeRenderer | null;

    private readonly opts: Required<BracketRendererOpts>;
    private readonly height: number;
    private readonly width: number;

    public readonly element: HTMLElement;

    constructor(width: number, height: number, opts?: BracketRendererOpts) {
        this.activeRenderer = null;

        this.width = width;
        this.height = height;
        this.opts = {
            animator: opts?.animator ?? new DummyBracketAnimator(),
            formatter: opts?.formatter ?? new BaseTextFormatter(),
            eliminationOpts: opts?.eliminationOpts ?? {},
            swissOpts: opts?.swissOpts ?? {}
        }

        this.element = d3
            .create('div')
            .classed('bracket-renderer', true)
            .node()!;
    }

    async setData(data: Bracket) {
        // cool: https://github.com/Microsoft/TypeScript/issues/3841
        if (
            this.activeRenderer == null ||
            !(this.activeRenderer.constructor as typeof BracketTypeRenderer).compatibleBracketTypes.includes(data.type)
        ) {
            await this.activeRenderer?.hide();
            this.activeRenderer?.destroy();

            this.activeRenderer = this.getRenderer(data.type);
            this.activeRenderer.install(this.element);
        }

        return this.activeRenderer.setData(data);
    }

    private getRenderer(type: BracketType): BracketTypeRenderer {
        if (SwissRenderer.compatibleBracketTypes.includes(type)) {
            return new SwissRenderer({
                animator: this.opts.animator,
                formatter: this.opts.formatter,
                ...this.opts.swissOpts
            });
        }

        if (EliminationRenderer.compatibleBracketTypes.includes(type)) {
            return new EliminationRenderer({
                animator: this.opts.animator,
                formatter: this.opts.formatter,
                ...this.opts.eliminationOpts
            });
        }

        return new DummyRenderer();
    }
}
