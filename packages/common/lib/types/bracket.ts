import { MatchGroup } from './match';

export interface Bracket {
    id?: string
    type: BracketType
    matchGroups: MatchGroup[]
}

export enum BracketType {
    DOUBLE_ELIMINATION,
    SINGLE_ELIMINATION,
    LADDER,
    SWISS,
    ROUND_ROBIN
}
