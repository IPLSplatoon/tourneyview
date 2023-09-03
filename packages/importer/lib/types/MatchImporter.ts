import { Bracket } from '@tourneyview/common';
import { BracketQuerySelectParameter } from './BracketQuery';

export interface MatchImporter<ImportOpts> {
    getBracketQuery(tournamentId: string): Promise<BracketQuerySelectParameter[]> | BracketQuerySelectParameter[]

    getMatches(opts: ImportOpts): Promise<Bracket> | Bracket
}
