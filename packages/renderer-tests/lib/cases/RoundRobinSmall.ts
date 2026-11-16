import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const RoundRobinSmall: Bracket = {
    id: 'RoundRobinSmall',
    name: 'Small Round Robin',
    eventName: 'Test Event',
    type: BracketType.ROUND_ROBIN,
    matchGroups: [
        {
            id: 'RoundRobinSmall_group_0',
            name: 'Match Group #1',
            matches: [
                {
                    id: '0_0',
                    roundNumber: 1,
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
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_1',
                    roundNumber: 2,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_2',
                    roundNumber: 3,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                }
            ]
        }
    ]
};