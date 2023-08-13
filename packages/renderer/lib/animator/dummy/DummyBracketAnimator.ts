import { BracketAnimator, EliminationAnimator, SwissAnimator } from '../../types/animator';
import { DummyEliminationAnimator } from './DummyEliminationAnimator';
import { DummySwissAnimator } from './DummySwissAnimator';

export class DummyBracketAnimator implements BracketAnimator {
    public readonly eliminationAnimator: EliminationAnimator;
    public readonly swissAnimator: SwissAnimator;

    constructor() {
        this.eliminationAnimator = new DummyEliminationAnimator();
        this.swissAnimator = new DummySwissAnimator();
    }

    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void {
        element.innerText = formattedNewValue;
    }

    updateText(element: HTMLElement, oldValue: string, newValue: string): void {
        element.innerText = newValue;
    }
}