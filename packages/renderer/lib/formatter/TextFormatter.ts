import { BracketType, MatchState, MatchTeam } from "@tourneyview/common"

export interface TextFormatter {
    formatScore(team: MatchTeam | undefined, bracketType: BracketType, matchState: MatchState): string

    formatTeamName(name: string | undefined | null): string

    formatEliminationRoundNumber(roundNumber: number, maxRoundNumber: number, isLosersSide: boolean, hasBracketReset: boolean, bracketType: BracketType.DOUBLE_ELIMINATION | BracketType.SINGLE_ELIMINATION): string
}
