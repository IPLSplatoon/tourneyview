import { EliminationRenderer } from '../renderer/EliminationRenderer';

export interface BracketAnimator {
    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void

    updateText(element: HTMLElement, oldValue: string, newValue: string): void

    hideEliminationBracket(element: HTMLElement, renderer: EliminationRenderer): Promise<void>

    beforeEliminationBracketReveal(element: HTMLElement, renderer: EliminationRenderer): void

    revealEliminationBracket(element: HTMLElement, renderer: EliminationRenderer): Promise<void>
}
