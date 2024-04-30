import { BracketType, MatchState, MatchTeam } from '@tourneyview/common'

export interface TextFormatter {
    formatScore(team: MatchTeam | undefined, bracketType: BracketType, matchState: MatchState): string

    formatTeamName(name: string | undefined | null): string
}