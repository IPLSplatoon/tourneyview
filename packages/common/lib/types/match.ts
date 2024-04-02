export enum MatchState {
    UNKNOWN = 'UNKNOWN',
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export interface Match {
    id: string
    nextMatchId?: string | null
    roundNumber?: number
    type?: MatchType
    topTeam: MatchTeam
    bottomTeam: MatchTeam
    state: MatchState
}

// A "Match Group" can represent:
// From Battlefy, the contents of a single bracket
// From start.gg, a single pool within a bracket
export interface MatchGroup {
    id: string
    name: string
    hasBracketReset?: boolean
    containedMatchType?: ContainedMatchType
    matches: Match[]
}

export enum ContainedMatchType {
    ALL_MATCHES = 'ALL_MATCHES',
    WINNERS = 'WINNERS',
    LOSERS = 'LOSERS'
}

export enum MatchType {
    WINNERS,
    LOSERS
}

export interface MatchTeam {
    id?: string | number | null
    name?: string | null
    score?: number | null
    isDisqualified: boolean
    isWinner: boolean
}
