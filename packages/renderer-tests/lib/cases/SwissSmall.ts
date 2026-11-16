import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const SwissSmall: Bracket = {
    id: 'SwissSmall',
    name: 'Small Swiss',
    eventName: 'Test Event',
    type: BracketType.SWISS,
    matchGroups: [
        {
            id: 'SwissSmall_group_0',
            name: 'Match Group #1',
            matches: [
                {
                    id: '0_0',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_1',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_2',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                }
            ]
        }
    ]
};