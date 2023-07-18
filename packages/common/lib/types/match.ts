export interface Match {
    id: string
    nextMatchId?: string | null
    roundNumber: number
    type: MatchType
    topTeam: MatchTeam
    bottomTeam: MatchTeam
}

export enum MatchType {
    WINNERS,
    LOSERS
}

interface MatchTeam {
    name?: string | null
    score?: number | null
}
