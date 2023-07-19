import { MatchGroup } from './match';

export interface Bracket {
    id?: string
    type: BracketType
    matchGroups: MatchGroup[]
}

export enum BracketType {
    DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
    SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
    LADDER = 'LADDER',
    SWISS = 'SWISS',
    ROUND_ROBIN = 'ROUND_ROBIN'
}
