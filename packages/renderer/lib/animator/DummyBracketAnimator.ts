import { BracketAnimator } from '../types/animator';

export class DummyBracketAnimator implements BracketAnimator {
    updateScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string): void {
        element.innerText = formattedNewValue;
    }

    updateText(element: HTMLElement, oldValue: string, newValue: string): void {
        element.innerText = newValue;
    }

    hideEliminationBracket(element: HTMLElement): Promise<void> {
        return Promise.resolve();
    }

    beforeEliminationBracketReveal(element: HTMLElement): void {

    }

    async revealEliminationBracket(element: HTMLElement): Promise<void> {
        return Promise.resolve();
    }
}