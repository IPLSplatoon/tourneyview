import { SwissAnimator } from '../../types/animator';

export class DummySwissAnimator implements SwissAnimator {
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
