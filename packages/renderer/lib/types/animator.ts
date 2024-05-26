import { EliminationRenderer } from '../renderer/EliminationRenderer';
import { RoundRobinRenderer } from '../renderer/RoundRobinRenderer';
import { SwissRenderer } from '../renderer/SwissRenderer';

export interface BracketAnimationOpts<Renderer> {
    renderer: Renderer
    delay?: number
}

export type PublicBracketAnimationOpts = Omit<BracketAnimationOpts<unknown>, 'renderer'>;

export interface BracketTypeAnimator<Renderer> {
    beforeHide(element: HTMLElement, renderer: Renderer): void

    hide(element: HTMLElement, opts: BracketAnimationOpts<Renderer>): Promise<unknown>

    beforeReveal(element: HTMLElement, renderer: Renderer): void

    reveal(element: HTMLElement, opts: BracketAnimationOpts<Renderer>): Promise<unknown>
}

export type EliminationAnimator = BracketTypeAnimator<EliminationRenderer>

export type SwissAnimator = BracketTypeAnimator<SwissRenderer>

export type RoundRobinAnimator = BracketTypeAnimator<RoundRobinRenderer>
