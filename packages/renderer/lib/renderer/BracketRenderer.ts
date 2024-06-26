import { BracketTypeRenderer } from '../types/renderer';
import { TextFormatter } from '../formatter/TextFormatter';
import { EliminationRenderer, EliminationRendererOpts } from './EliminationRenderer';
import { SwissRenderer, SwissRendererOpts } from './SwissRenderer';
import { Bracket, BracketType } from '@tourneyview/common';
import { DummyBracketAnimator } from '../animator/dummy/DummyBracketAnimator';
import { BaseTextFormatter } from '../formatter/BaseTextFormatter';
import * as d3 from 'd3';
import { DummyRenderer } from './DummyRenderer';
import { BaseBracketAnimator } from '../animator/BaseBracketAnimator';
import { RoundRobinRenderer, RoundRobinRendererOpts } from './RoundRobinRenderer';
import { PublicBracketAnimationOpts } from '../types/animator';

type WithoutCommonOpts<T> = Omit<T, 'animator' | 'formatter'>;
export type BracketRendererOpts = {
    animator?: BaseBracketAnimator
    formatter?: TextFormatter
    eliminationOpts?: WithoutCommonOpts<EliminationRendererOpts>
    swissOpts?: WithoutCommonOpts<SwissRendererOpts>
    roundRobinOpts?: WithoutCommonOpts<RoundRobinRendererOpts>
};

export class BracketRenderer {
    private activeRenderer: BracketTypeRenderer | null;

    private readonly opts: Required<BracketRendererOpts>;

    public readonly element: HTMLElement;

    constructor(opts?: BracketRendererOpts) {
        this.activeRenderer = null;

        this.opts = {
            animator: opts?.animator ?? new DummyBracketAnimator(),
            formatter: opts?.formatter ?? new BaseTextFormatter(),
            eliminationOpts: opts?.eliminationOpts ?? {},
            swissOpts: opts?.swissOpts ?? {},
            roundRobinOpts: opts?.roundRobinOpts ?? {}
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

    beforeReveal(): void {
        this.activeRenderer?.beforeReveal();
    }

    async reveal(opts: PublicBracketAnimationOpts = {}): Promise<void> {
        await this.activeRenderer?.reveal(opts);
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

        if (RoundRobinRenderer.compatibleBracketTypes.includes(type)) {
            return new RoundRobinRenderer({
                animator: this.opts.animator,
                formatter: this.opts.formatter,
                ...this.opts.roundRobinOpts
            });
        }

        return new DummyRenderer();
    }
}
