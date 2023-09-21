import { BracketType } from '@tourneyview/common';
import { TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(score: number | undefined | null): string {
        return score == null || isNaN(score) ? '-' : String(score);
    }

    formatTeamName(name: string | undefined | null): string {
        return name == null ? '-' : name;
    }

    formatEliminationRoundNumber(roundNumber: number, maxRoundNumber: number, isLosersSide: boolean, hasBracketReset: boolean, bracketType: BracketType.DOUBLE_ELIMINATION | BracketType.SINGLE_ELIMINATION): string {
        if (bracketType === BracketType.SINGLE_ELIMINATION || isLosersSide) {
            if (roundNumber === maxRoundNumber) {
                return 'Finals';
            } else if (roundNumber === maxRoundNumber - 1) {
                return 'Semi-Finals'
            }
        } else if (bracketType === BracketType.DOUBLE_ELIMINATION) {
            const normalizedRoundNumber = hasBracketReset ? roundNumber : roundNumber - 1;

            if (normalizedRoundNumber === maxRoundNumber) {
                return 'Bracket Reset';
            } else if (normalizedRoundNumber === maxRoundNumber - 1) {
                return 'Grand Finals'
            } else if (normalizedRoundNumber === maxRoundNumber - 2) {
                return 'Finals'
            } else if (normalizedRoundNumber === maxRoundNumber - 3) {
                return 'Semi-Finals'
            }
        }

        return `Round ${roundNumber}`;
    }
}
