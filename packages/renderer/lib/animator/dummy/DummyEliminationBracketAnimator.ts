import { EliminationBracketAnimator } from '../../types/animator';

export class DummyEliminationBracketAnimator implements EliminationBracketAnimator {
    beforeHide() {

    }

    hide(): Promise<void> {
        return Promise.resolve();
    }

    beforeReveal(): void {

    }

    async reveal(): Promise<void> {
        return Promise.resolve();
    }
}
