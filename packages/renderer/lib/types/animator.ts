import { EliminationRenderer } from '../renderer/EliminationRenderer';

export interface BracketAnimator {
    readonly eliminationAnimator: EliminationBracketAnimator

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void

    updateText(element: HTMLElement, oldValue: string, newValue: string): void
}

interface BracketTypeAnimator<Renderer> {
    beforeHide(element: HTMLElement, renderer: Renderer): void

    hide(element: HTMLElement, renderer: Renderer): Promise<void>

    beforeReveal(element: HTMLElement, renderer: Renderer): void

    reveal(element: HTMLElement, renderer: Renderer): Promise<void>
}

export type EliminationBracketAnimator = BracketTypeAnimator<EliminationRenderer>

export type SwissBracketAnimator = BracketTypeAnimator<SwissRenderer>
