import { BracketAnimator, EliminationBracketAnimator } from '../../types/animator';
import { DummyEliminationBracketAnimator } from './DummyEliminationBracketAnimator';

export class DummyBracketAnimator implements BracketAnimator {
    public readonly eliminationAnimator: EliminationBracketAnimator;

    constructor() {
        this.eliminationAnimator = new DummyEliminationBracketAnimator();
    }
    
    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void {
        element.innerText = formattedNewValue;
    }

    updateText(element: HTMLElement, oldValue: string, newValue: string): void {
        element.innerText = newValue;
    }
}