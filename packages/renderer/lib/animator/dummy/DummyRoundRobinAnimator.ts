import { RoundRobinAnimator } from '../../types/animator';

export class DummyRoundRobinAnimator implements RoundRobinAnimator {
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
