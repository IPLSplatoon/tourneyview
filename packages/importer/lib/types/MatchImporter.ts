import { Bracket } from '@tourneyview/common';
import { BracketQueryParameter } from './BracketQuery';

export interface MatchImporter<ImportOpts> {
    getBracketQuery(tournamentId: string): Promise<BracketQueryParameter[]> | BracketQueryParameter[]

    getMatches(opts: ImportOpts): Promise<Bracket> | Bracket
}
