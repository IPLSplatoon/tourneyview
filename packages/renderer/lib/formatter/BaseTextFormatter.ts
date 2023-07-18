import { TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(score: number | undefined | null): string {
        return score == null || isNaN(score) ? '-' : String(score);
    }

    formatTeamName(name: string | undefined | null): string {
        return name == null ? '-' : name;
    }

    formatRoundNumber(roundNumber: number, maxRoundNumber: number): string {
        return roundNumber === maxRoundNumber ? 'Finals' : `Round ${roundNumber}`;
    }
}
