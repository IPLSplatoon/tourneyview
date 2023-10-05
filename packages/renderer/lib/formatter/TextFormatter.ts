import { BracketType, MatchState } from "@tourneyview/common"

export interface TextFormatter {
    formatScore(score: number | undefined | null, isDisqualified: boolean, bracketType: BracketType, matchState: MatchState): string

    formatTeamName(name: string | undefined | null): string

    formatEliminationRoundNumber(roundNumber: number, maxRoundNumber: number, isLosersSide: boolean, hasBracketReset: boolean, bracketType: BracketType.DOUBLE_ELIMINATION | BracketType.SINGLE_ELIMINATION): string
}
