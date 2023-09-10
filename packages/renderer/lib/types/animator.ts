import { BracketType } from '@tourneyview/common';
import { EliminationRenderer } from '../renderer/EliminationRenderer';
import { SwissRenderer } from '../renderer/SwissRenderer';

export interface BracketAnimator {
    readonly eliminationAnimator: EliminationAnimator

    readonly swissAnimator: SwissAnimator

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, bracketType: BracketType): void

    updateText(element: HTMLElement, oldValue: string, newValue: string, bracketType: BracketType): void
}

interface BracketTypeAnimator<Renderer> {
    beforeHide(element: HTMLElement, renderer: Renderer): void

    hide(element: HTMLElement, renderer: Renderer): Promise<unknown>

    beforeReveal(element: HTMLElement, renderer: Renderer): void

    reveal(element: HTMLElement, renderer: Renderer): Promise<unknown>
}

export type EliminationAnimator = BracketTypeAnimator<EliminationRenderer>

export type SwissAnimator = BracketTypeAnimator<SwissRenderer>
