import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const Swiss: Bracket = {
    id: 'Swiss',
    name: 'Swiss',
    eventName: 'Test Event',
    type: BracketType.SWISS,
    matchGroups: [
        {
            id: 'Swiss_group_0',
            name: 'Match Group #1',
            matches: [
                {
                    id: '0_0',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: -1,
                        isDisqualified: true,
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
                    roundNumber: 5,
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
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 0,
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
                },
                {
                    id: '0_3',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_4',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_5',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_6',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_7',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_8',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_9',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 20,
                        name: 'Team 20',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_10',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        isDisqualified: false,
                        isWinner: false,
                        id: null
                    }
                }
            ]
        }
    ]
};