import { BracketType, MatchState, MatchTeam } from '@tourneyview/common';
import { TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(team: MatchTeam | undefined, bracketType: BracketType, matchState: MatchState): string {
        if (team?.isDisqualified) {
            return 'DQ';
        }

        if (team == null || team.id == null) {
            return bracketType === BracketType.ROUND_ROBIN ? '?' : '-';
        }

        if (team.score == null) {
            if (matchState === MatchState.COMPLETED) {
                // Some brackets in start.gg don't contain score, only reporting a win or a loss.
                return team.isWinner ? 'W' : 'L';
            } else if (matchState === MatchState.IN_PROGRESS || matchState === MatchState.NOT_STARTED) {
                return '0';
            } else {
                return bracketType === BracketType.ROUND_ROBIN ? '?' : '-';
            }
        }

        return String(team.score);
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
