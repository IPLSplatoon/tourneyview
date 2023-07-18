import { Match } from './match';

export interface Bracket {
    id: string
    type: BracketType
    matches: Match[]
}

export enum BracketType {
    DOUBLE_ELIMINATION,
    SINGLE_ELIMINATION,
    LADDER,
    SWISS,
    ROUND_ROBIN
}
