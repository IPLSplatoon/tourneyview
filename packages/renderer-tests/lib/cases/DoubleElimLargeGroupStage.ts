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
                    id: '0_0',
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
                    id: '0_1',
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
                    id: '0_2',
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
                    id: '0_3',
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
                    id: '0_4',
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
                    id: '0_5',
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
                    id: '0_6',
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
                    id: '0_7',
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
                    id: '0_8',
                    nextMatchId: '0_0',
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
                    id: '0_9',
                    nextMatchId: '0_1',
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
                    id: '0_10',
                    nextMatchId: '0_2',
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
                    id: '0_11',
                    nextMatchId: '0_3',
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
                    id: '0_12',
                    nextMatchId: '0_4',
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
                    id: '0_13',
                    nextMatchId: '0_5',
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
                    id: '0_14',
                    nextMatchId: '0_6',
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
                    id: '0_15',
                    nextMatchId: '0_7',
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
                    id: '0_16',
                    nextMatchId: '0_8',
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
                    id: '0_17',
                    nextMatchId: '0_8',
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
                    id: '0_18',
                    nextMatchId: '0_9',
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
                    id: '0_19',
                    nextMatchId: '0_9',
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
                    id: '0_20',
                    nextMatchId: '0_10',
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
                    id: '0_21',
                    nextMatchId: '0_10',
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
                    id: '0_22',
                    nextMatchId: '0_11',
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
                    id: '0_23',
                    nextMatchId: '0_11',
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
                    id: '0_24',
                    nextMatchId: '0_12',
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
                    id: '0_25',
                    nextMatchId: '0_12',
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
                    id: '0_26',
                    nextMatchId: '0_13',
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
                    id: '0_27',
                    nextMatchId: '0_13',
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
                    id: '0_28',
                    nextMatchId: '0_14',
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
                    id: '0_29',
                    nextMatchId: '0_14',
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
                    id: '0_30',
                    nextMatchId: '0_15',
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
                    id: '0_31',
                    nextMatchId: '0_15',
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
                    id: '0_32',
                    nextMatchId: '0_17',
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
                    id: '0_33',
                    nextMatchId: '0_21',
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
                    id: '0_34',
                    nextMatchId: '0_23',
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
                    id: '0_35',
                    nextMatchId: '0_25',
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
                    id: '0_36',
                    nextMatchId: '0_29',
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
                    id: '0_37',
                    nextMatchId: '0_31',
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
                    id: '0_38',
                    nextMatchId: '0_72',
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
                    id: '0_39',
                    nextMatchId: '0_73',
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
                    id: '0_40',
                    nextMatchId: '0_73',
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
                    id: '0_41',
                    nextMatchId: '0_74',
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
                    id: '0_42',
                    nextMatchId: '0_75',
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
                    id: '0_43',
                    nextMatchId: '0_60',
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
                    id: '0_44',
                    nextMatchId: '0_61',
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
                    id: '0_45',
                    nextMatchId: '0_61',
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
                    id: '0_46',
                    nextMatchId: '0_62',
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
                    id: '0_47',
                    nextMatchId: '0_63',
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
                    id: '0_48',
                    nextMatchId: '0_63',
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
                    id: '0_49',
                    nextMatchId: '0_64',
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
                    id: '0_50',
                    nextMatchId: '0_65',
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
                    id: '0_51',
                    nextMatchId: '0_65',
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
                    id: '0_52',
                    nextMatchId: '0_66',
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
                    id: '0_53',
                    nextMatchId: '0_67',
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
                    id: '0_54',
                    nextMatchId: '0_68',
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
                    id: '0_55',
                    nextMatchId: '0_69',
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
                    id: '0_56',
                    nextMatchId: '0_69',
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
                    id: '0_57',
                    nextMatchId: '0_70',
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
                    id: '0_58',
                    nextMatchId: '0_71',
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
                    id: '0_59',
                    nextMatchId: '0_71',
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
                    id: '0_60',
                    nextMatchId: '0_78',
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
                    id: '0_61',
                    nextMatchId: '0_78',
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
                    id: '0_62',
                    nextMatchId: '0_79',
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
                    id: '0_63',
                    nextMatchId: '0_79',
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
                    id: '0_64',
                    nextMatchId: '0_80',
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
                    id: '0_65',
                    nextMatchId: '0_80',
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
                    id: '0_66',
                    nextMatchId: '0_81',
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
                    id: '0_67',
                    nextMatchId: '0_81',
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
                    id: '0_68',
                    nextMatchId: '0_82',
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
                    id: '0_69',
                    nextMatchId: '0_82',
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
                    id: '0_70',
                    nextMatchId: '0_83',
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
                    id: '0_71',
                    nextMatchId: '0_83',
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
                    id: '0_72',
                    nextMatchId: '0_76',
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
                    id: '0_73',
                    nextMatchId: '0_76',
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
                    id: '0_74',
                    nextMatchId: '0_77',
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
                    id: '0_75',
                    nextMatchId: '0_77',
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
                    id: '0_76',
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
                    id: '0_77',
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
                    id: '0_78',
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
                    id: '0_79',
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
                    id: '0_80',
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
                    id: '0_81',
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
                    id: '0_82',
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
                    id: '0_83',
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