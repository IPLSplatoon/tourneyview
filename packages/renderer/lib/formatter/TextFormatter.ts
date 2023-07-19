export interface TextFormatter {
    formatScore(score: number | undefined | null): string

    formatTeamName(name: string | undefined | null): string

    formatRoundNumber(roundNumber: number, maxRoundNumber: number, hasBracketReset: boolean): string
}
