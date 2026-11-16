import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const DoubleElimLargeGroupStage: Bracket = {
    id: 'DoubleElimLargeGroupStage',
    name: 'Large DE Group Stage',
    eventName: 'Test Event',
    type: BracketType.DOUBLE_ELIMINATION,
    matchGroups: [
        {
            id: 'DoubleElimLargeGroupStage_group_0',
            name: 'Match Group #1',
            containedMatchType: ContainedMatchType.ALL_MATCHES,
            matches: [
                {
                    id: 'DoubleElimLargeGroupStage_0_0',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
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
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_1',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
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
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_2',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
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
                    id: 'DoubleElimLargeGroupStage_0_3',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
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
                    id: 'DoubleElimLargeGroupStage_0_4',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_5',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_6',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_7',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_8',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_0',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_9',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_1',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 0,
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
                    id: 'DoubleElimLargeGroupStage_0_10',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_2',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
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
                    id: 'DoubleElimLargeGroupStage_0_11',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_3',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 20,
                        name: 'Team 20',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_12',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_4',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_13',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_5',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 22,
                        name: 'Team 22',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_14',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_6',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 23,
                        name: 'Team 23',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_15',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_7',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 24,
                        name: 'Team 24',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_16',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_8',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 25,
                        name: 'Team 25',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_17',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_8',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 26,
                        name: 'Team 26',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_18',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_9',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 27,
                        name: 'Team 27',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_19',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_9',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 28,
                        name: 'Team 28',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_20',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_10',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 29,
                        name: 'Team 29',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_21',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_10',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 30,
                        name: 'Team 30',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_22',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_11',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 31,
                        name: 'Team 31',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_23',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_11',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 20,
                        name: 'Team 20',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_24',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_12',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 33,
                        name: 'Team 33',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_25',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_12',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 34,
                        name: 'Team 34',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_26',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_13',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 35,
                        name: 'Team 35',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_27',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_13',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 22,
                        name: 'Team 22',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 36,
                        name: 'Team 36',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_28',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_14',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 37,
                        name: 'Team 37',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_29',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_14',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 23,
                        name: 'Team 23',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 38,
                        name: 'Team 38',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_30',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_15',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 24,
                        name: 'Team 24',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 39,
                        name: 'Team 39',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_31',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_15',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 40,
                        name: 'Team 40',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_32',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_17',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 41,
                        name: 'Team 41',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 26,
                        name: 'Team 26',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_33',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_21',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 42,
                        name: 'Team 42',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 30,
                        name: 'Team 30',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_34',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_23',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 43,
                        name: 'Team 43',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_35',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_25',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 34,
                        name: 'Team 34',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 44,
                        name: 'Team 44',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_36',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_29',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 38,
                        name: 'Team 38',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 45,
                        name: 'Team 45',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_37',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_31',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 40,
                        name: 'Team 40',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 46,
                        name: 'Team 46',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_38',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_72',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 25,
                        name: 'Team 25',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_39',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_73',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 41,
                        name: 'Team 41',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_40',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_73',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 24,
                        name: 'Team 24',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 26,
                        name: 'Team 26',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_41',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_74',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 23,
                        name: 'Team 23',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 27,
                        name: 'Team 27',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_42',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_75',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 28,
                        name: 'Team 28',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_43',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_60',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 22,
                        name: 'Team 22',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 29,
                        name: 'Team 29',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_44',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_61',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 42,
                        name: 'Team 42',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_45',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_61',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 30,
                        name: 'Team 30',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_46',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_62',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 31,
                        name: 'Team 31',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_47',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_63',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_48',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_63',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 43,
                        name: 'Team 43',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_49',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_64',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 33,
                        name: 'Team 33',
                        score: 0,
                        isDisqualified: false,
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
                    id: 'DoubleElimLargeGroupStage_0_50',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_65',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 34,
                        name: 'Team 34',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_51',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_65',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 44,
                        name: 'Team 44',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_52',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_66',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 35,
                        name: 'Team 35',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_53',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_67',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 36,
                        name: 'Team 36',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_54',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_68',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 37,
                        name: 'Team 37',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_55',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_69',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 38,
                        name: 'Team 38',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_56',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_69',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 45,
                        name: 'Team 45',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_57',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_70',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 39,
                        name: 'Team 39',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_58',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_71',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 47,
                        name: 'Team 47',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 40,
                        name: 'Team 40',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_59',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_71',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 46,
                        name: 'Team 46',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_60',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_78',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 48,
                        name: 'Team 48',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 22,
                        name: 'Team 22',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_61',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_78',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_62',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_79',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 49,
                        name: 'Team 49',
                        score: null,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: -1,
                        isDisqualified: true,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_63',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_79',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_64',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_80',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 50,
                        name: 'Team 50',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 20,
                        name: 'Team 20',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_65',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_80',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
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
                    id: 'DoubleElimLargeGroupStage_0_66',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_81',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_67',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_81',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 51,
                        name: 'Team 51',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_68',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_82',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 52,
                        name: 'Team 52',
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
                    id: 'DoubleElimLargeGroupStage_0_69',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_82',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_70',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_83',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_71',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_83',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 47,
                        name: 'Team 47',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_72',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_76',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 53,
                        name: 'Team 53',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_73',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_76',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 24,
                        name: 'Team 24',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_74',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_77',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 23,
                        name: 'Team 23',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_75',
                    nextMatchId: 'DoubleElimLargeGroupStage_0_77',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 54,
                        name: 'Team 54',
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
                    id: 'DoubleElimLargeGroupStage_0_76',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 53,
                        name: 'Team 53',
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
                    id: 'DoubleElimLargeGroupStage_0_77',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 54,
                        name: 'Team 54',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_78',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 48,
                        name: 'Team 48',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_79',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 49,
                        name: 'Team 49',
                        score: 2,
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
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_80',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 50,
                        name: 'Team 50',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_81',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 51,
                        name: 'Team 51',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_82',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 52,
                        name: 'Team 52',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElimLargeGroupStage_0_83',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 47,
                        name: 'Team 47',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                }
            ]
        }
    ]
};