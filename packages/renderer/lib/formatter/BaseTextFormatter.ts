import { BracketType, MatchState } from '@tourneyview/common';
import { TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(score: number | undefined | null, isDisqualified: Boolean, bracketType: BracketType, matchState: MatchState): string {
        if (isDisqualified) {
            return 'DQ';
        }

        if (score == null || isNaN(score)) {
            if (matchState === MatchState.COMPLETED || matchState === MatchState.IN_PROGRESS) {
                return '0';
            } else if (bracketType === BracketType.ROUND_ROBIN) {
                return '?';
            } else {
                return '-';
            }
        }

        return String(score);
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
