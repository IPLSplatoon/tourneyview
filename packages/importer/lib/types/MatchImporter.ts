import { Bracket } from '@tourneyview/common';
import { MatchQueryParameter, MatchQueryResult } from './MatchQuery';

export interface MatchImporter<ImportOpts> {
    getMatchQueryOptions(tournamentId: string): Promise<MatchQueryParameter[]> | MatchQueryParameter[]

    getMatches(opts: ImportOpts & MatchQueryResult): Promise<Bracket> | Bracket
}
