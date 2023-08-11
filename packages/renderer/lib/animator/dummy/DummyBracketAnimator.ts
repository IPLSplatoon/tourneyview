import { BracketAnimator, EliminationBracketAnimator, SwissBracketAnimator } from '../../types/animator';
import { DummyEliminationBracketAnimator } from './DummyEliminationBracketAnimator';
import { DummySwissBracketAnimator } from './DummySwissBracketAnimator';

export class DummyBracketAnimator implements BracketAnimator {
    public readonly eliminationAnimator: EliminationBracketAnimator;
    public readonly swissAnimator: SwissBracketAnimator;

    constructor() {
        this.eliminationAnimator = new DummyEliminationBracketAnimator();
        this.swissAnimator = new DummySwissBracketAnimator();
    }

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void {
        element.innerText = formattedNewValue;
    }

    updateText(element: HTMLElement, oldValue: string, newValue: string): void {
        element.innerText = newValue;
    }
}