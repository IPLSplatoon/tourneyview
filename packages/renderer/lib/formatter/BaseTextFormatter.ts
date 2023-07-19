import { TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(score: number | undefined | null): string {
        return score == null || isNaN(score) ? '-' : String(score);
    }

    formatTeamName(name: string | undefined | null): string {
        return name == null ? '-' : name;
    }

    formatRoundNumber(roundNumber: number, maxRoundNumber: number, hasBracketReset: boolean): string {
        if (hasBracketReset) {
            if (roundNumber === maxRoundNumber - 1) {
                return 'Finals';
            } else if (roundNumber === maxRoundNumber) {
                return 'Bracket Reset';
            }
        }

        if (roundNumber === maxRoundNumber) {
            return 'Finals';
        }

        return `Round ${roundNumber}`;
    }
}
