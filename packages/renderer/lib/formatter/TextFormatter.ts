import { BracketType, MatchState, MatchTeam } from '@tourneyview/common'

export interface FormatScoreOpts {
    team?: MatchTeam
    opponentTeam?: MatchTeam
    bracketType: BracketType
    matchState: MatchState
}

export interface TextFormatter {
    formatScore(opts: FormatScoreOpts): string

    formatTeamName(name: string | undefined | null): string
}