import { MatchGroup } from './match';

export interface Bracket {
    id?: string
    roundNumber?: number
    type: BracketType
    name: string
    eventName: string
    eventId?: string
    // The tournament name and ID are filled if the tournament hosts more than one event.
    // This currently only happens for start.gg events.
    tournamentName?: string
    tournamentId?: string
    matchGroups: MatchGroup[]
}

export enum BracketType {
    DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
    SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
    LADDER = 'LADDER',
    SWISS = 'SWISS',
    ROUND_ROBIN = 'ROUND_ROBIN'
}
