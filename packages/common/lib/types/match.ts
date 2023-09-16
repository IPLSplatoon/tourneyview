export interface Match {
    id: string
    nextMatchId?: string | null
    roundNumber?: number
    type?: MatchType
    topTeam: MatchTeam
    bottomTeam: MatchTeam
}

// A "Match Group" can represent:
// From Battlefy, the contents of a single bracket
// From start.gg, a single pool within a bracket
export interface MatchGroup {
    id: string
    name: string
    hasBracketReset?: boolean
    matches: Match[]
}

export enum MatchType {
    WINNERS,
    LOSERS
}

interface MatchTeam {
    name?: string | null
    score?: number | null
}
