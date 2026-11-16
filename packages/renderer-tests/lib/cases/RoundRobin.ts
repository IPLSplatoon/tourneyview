import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const RoundRobin: Bracket = {
    id: 'RoundRobin',
    name: 'Round Robin',
    eventName: 'Test Event',
    type: BracketType.ROUND_ROBIN,
    matchGroups: [
        {
            id: 'RoundRobin_group_0',
            name: 'Match Group #1',
            matches: [
                {
                    id: '0_0',
                    roundNumber: 1,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
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
                    id: '0_1',
                    roundNumber: 1,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_2',
                    roundNumber: 1,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_3',
                    roundNumber: 1,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_4',
                    roundNumber: 2,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
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
                    id: '0_5',
                    roundNumber: 2,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_6',
                    roundNumber: 2,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_7',
                    roundNumber: 2,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_8',
                    roundNumber: 3,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_9',
                    roundNumber: 3,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
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
                    id: '0_10',
                    roundNumber: 3,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_11',
                    roundNumber: 3,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: '0_12',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_13',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
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
                    id: '0_14',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_15',
                    roundNumber: 4,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_16',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_17',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_18',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: '0_19',
                    roundNumber: 5,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_20',
                    roundNumber: 6,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_21',
                    roundNumber: 6,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: '0_22',
                    roundNumber: 6,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_23',
                    roundNumber: 6,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_24',
                    roundNumber: 7,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_25',
                    roundNumber: 7,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_26',
                    roundNumber: 7,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: '0_27',
                    roundNumber: 7,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_28',
                    roundNumber: 8,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_29',
                    roundNumber: 8,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_30',
                    roundNumber: 8,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 2,
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
                    id: '0_31',
                    roundNumber: 8,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_32',
                    roundNumber: 9,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_33',
                    roundNumber: 9,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_34',
                    roundNumber: 9,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_35',
                    roundNumber: 9,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
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
                }
            ]
        }
    ]
};