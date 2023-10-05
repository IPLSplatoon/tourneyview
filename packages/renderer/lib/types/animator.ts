import { EliminationRenderer } from '../renderer/EliminationRenderer';
import { RoundRobinRenderer } from '../renderer/RoundRobinRenderer';
import { SwissRenderer } from '../renderer/SwissRenderer';

interface BracketTypeAnimator<Renderer> {
    beforeHide(element: HTMLElement, renderer: Renderer): void

    hide(element: HTMLElement, renderer: Renderer): Promise<unknown>

    beforeReveal(element: HTMLElement, renderer: Renderer): void

    reveal(element: HTMLElement, renderer: Renderer): Promise<unknown>
}

export type EliminationAnimator = BracketTypeAnimator<EliminationRenderer>

export type SwissAnimator = BracketTypeAnimator<SwissRenderer>

export type RoundRobinAnimator = BracketTypeAnimator<RoundRobinRenderer>
