import { Bracket } from '@tourneyview/common';
import { MatchImporter, MatchQueryParameter, MatchQueryResult } from '../../packages/importer/lib';

export class ClipboardImporter implements MatchImporter<unknown> {
    getMatchQueryOptions(tournamentId: string): MatchQueryParameter[] | Promise<MatchQueryParameter[]> {
        return [];
    }

    async getMatches(): Promise<Bracket> {
        return JSON.parse(await navigator.clipboard.readText());
    }
}
