import { EliminationRenderer } from '../renderer/EliminationRenderer';

export interface BracketAnimator {
    readonly eliminationAnimator: EliminationBracketAnimator

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void

    updateText(element: HTMLElement, oldValue: string, newValue: string): void
}

export interface EliminationBracketAnimator {
    hide(element: HTMLElement, renderer: EliminationRenderer): Promise<void>

    beforeReveal(element: HTMLElement, renderer: EliminationRenderer): void

    reveal(element: HTMLElement, renderer: EliminationRenderer): Promise<void>
}
