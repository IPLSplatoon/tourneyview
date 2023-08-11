import { EliminationBracketAnimator } from '../../types/animator';

export class DummyEliminationBracketAnimator implements EliminationBracketAnimator {
    hide(element: HTMLElement): Promise<void> {
        return Promise.resolve();
    }

    beforeReveal(element: HTMLElement): void {

    }

    async reveal(element: HTMLElement): Promise<void> {
        return Promise.resolve();
    }
}
