import { Bracket } from '@tourneyview/common';
import { MatchImporter, MatchQueryParameter } from '../../packages/importer/lib';

export class TextInputImporter implements MatchImporter<{ data: string }> {
    getMatchQueryOptions(): MatchQueryParameter[] | Promise<MatchQueryParameter[]> {
        return [];
    }

    async getMatches(input: { data: string }): Promise<Bracket> {
        return JSON.parse(input.data);
    }
}
