import { Bracket } from '@tourneyview/common';

export interface MatchImporter<ImportOpts> {
    getMatches(opts: ImportOpts): Promise<Bracket> | Bracket
}
