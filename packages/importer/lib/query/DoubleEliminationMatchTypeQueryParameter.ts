import { MatchQuerySelectParameter } from '../types/MatchQuery';
import { ContainedMatchType } from '@tourneyview/common';

export class DoubleEliminationMatchTypeQueryParameter implements MatchQuerySelectParameter {
    readonly key = 'matchType';
    readonly name = 'Matches to show';
    readonly type = 'select';
    readonly options = [
        { value: ContainedMatchType.ALL_MATCHES, name: 'All matches' },
        { value: ContainedMatchType.WINNERS, name: 'Winners bracket' },
        { value: ContainedMatchType.LOSERS, name: 'Losers bracket' }
    ]
}
