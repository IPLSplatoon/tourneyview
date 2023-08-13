import { EliminationAnimator } from '../../types/animator';

export class DummyEliminationAnimator implements EliminationAnimator {
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
