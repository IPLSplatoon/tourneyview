import { BracketType } from '@tourneyview/common';
import { EliminationAnimator, RoundRobinAnimator, SwissAnimator } from '../types/animator';

const disqualifiedTextClassName = 'is-disqualified';

export abstract class BaseBracketAnimator {
    public readonly eliminationAnimator: EliminationAnimator

    public readonly swissAnimator: SwissAnimator

    public readonly roundRobinAnimator: RoundRobinAnimator

    protected constructor(eliminationAnimator: EliminationAnimator, swissAnimator: SwissAnimator, roundRobinAnimator: RoundRobinAnimator) {
        this.eliminationAnimator = eliminationAnimator;
        this.swissAnimator = swissAnimator;
        this.roundRobinAnimator = roundRobinAnimator;
    }

    protected setDisqualifiedClass(element: HTMLElement, isDisqualified: boolean) {
        if (isDisqualified) {
            element.classList.add(disqualifiedTextClassName)
        } else {
            element.classList.remove(disqualifiedTextClassName);
        }
    }

    abstract setScore(
        element: HTMLElement,
        oldValue: number,
        newValue: number,
        formattedNewValue: string,
        isDisqualified: boolean,
        bracketType: BracketType
    ): void

    abstract animateScoreUpdate(
        element: HTMLElement,
        oldValue: number,
        newValue: number,
        formattedNewValue: string,
        isDisqualified: boolean,
        bracketType: BracketType
    ): void

    abstract setTeamName(
        element: HTMLElement,
        oldValue: string,
        newValue: string,
        isDisqualified: boolean,
        bracketType: BracketType
    ): void

    abstract animateTeamNameUpdate(
        element: HTMLElement,
        oldValue: string,
        newValue: string,
        isDisqualified: boolean,
        bracketType: BracketType
    ): void
}
