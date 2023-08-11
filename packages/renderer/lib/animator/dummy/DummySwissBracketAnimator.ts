import { SwissBracketAnimator } from '../../types/animator';

export class DummySwissBracketAnimator implements SwissBracketAnimator {
    beforeHide(): void {
    }

    beforeReveal(): void {
    }

    hide(): Promise<void> {
        return Promise.resolve();
    }

    reveal(): Promise<void> {
        return Promise.resolve();
    }

}
