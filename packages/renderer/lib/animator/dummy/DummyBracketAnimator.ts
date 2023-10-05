import { DummyEliminationAnimator } from './DummyEliminationAnimator';
import { DummySwissAnimator } from './DummySwissAnimator';
import { BaseBracketAnimator } from '../BaseBracketAnimator';
import { DummyRoundRobinAnimator } from './DummyRoundRobinAnimator';

export class DummyBracketAnimator extends BaseBracketAnimator {
    constructor() {
        super(new DummyEliminationAnimator(), new DummySwissAnimator(), new DummyRoundRobinAnimator());
    }

    setScore(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, isDisqualified: boolean): void {
        element.innerText = formattedNewValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }

    animateScoreUpdate(element: HTMLElement, oldValue: number, newValue: number, formattedNewValue: string, isDisqualified: boolean): void {
        element.innerText = formattedNewValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }

    setTeamName(element: HTMLElement, oldValue: string, newValue: string, isDisqualified: boolean): void {
        element.innerText = newValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }

    animateTeamNameUpdate(element: HTMLElement, oldValue: string, newValue: string, isDisqualified: boolean): void {
        element.innerText = newValue;
        this.setDisqualifiedClass(element, isDisqualified);
    }
}
