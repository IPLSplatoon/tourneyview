import { BracketType, MatchState, MatchTeam } from '@tourneyview/common';
import { FormatScoreOpts, TextFormatter } from './TextFormatter';

export class BaseTextFormatter implements TextFormatter {
    formatScore(opts: FormatScoreOpts): string {
        if (opts.team?.isDisqualified) {
            return 'DQ';
        }

        if (opts.team == null || opts.team.id == null || opts.opponentTeam == null || opts.opponentTeam.id == null) {
            return opts.bracketType === BracketType.ROUND_ROBIN ? '?' : '-';
        }

        if (opts.team.score == null) {
            if (opts.matchState === MatchState.COMPLETED) {
                // Some brackets in start.gg don't contain score, only reporting a win or a loss.
                return opts.team.isWinner ? 'W' : 'L';
            } else if (opts.matchState === MatchState.IN_PROGRESS || opts.matchState === MatchState.NOT_STARTED) {
                return '0';
            } else {
                return opts.bracketType === BracketType.ROUND_ROBIN ? '?' : '-';
            }
        }

        return String(opts.team.score);
    }

    formatTeamName(team: MatchTeam | null | undefined): string {
        return team?.name == null ? '-' : team.name;
    }
}
