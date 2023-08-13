import { BracketType } from '@tourneyview/common';
import { EliminationRenderer } from '../renderer/EliminationRenderer';
import { SwissRenderer } from '../renderer/SwissRenderer';

export interface BracketAnimator {
    readonly eliminationAnimator: EliminationBracketAnimator
    
    readonly swissAnimator: SwissBracketAnimator

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, bracketType: BracketType): void

    updateText(element: HTMLElement, oldValue: string, newValue: string, bracketType: BracketType): void
}

interface BracketTypeAnimator<Renderer> {
    beforeHide(element: HTMLElement, renderer: Renderer): void

    hide(element: HTMLElement, renderer: Renderer): Promise<void>

    beforeReveal(element: HTMLElement, renderer: Renderer): void

    reveal(element: HTMLElement, renderer: Renderer): Promise<void>
}

export type EliminationBracketAnimator = BracketTypeAnimator<EliminationRenderer>

export type SwissBracketAnimator = BracketTypeAnimator<SwissRenderer>
