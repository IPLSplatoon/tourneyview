import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const DoubleElim32Team: Bracket = {
    id: 'DoubleElim32Team',
    name: 'Large Double Elimination',
    eventName: 'Test Event',
    type: BracketType.DOUBLE_ELIMINATION,
    matchGroups: [
        {
            id: 'DoubleElim32Team_group_0',
            name: 'Match Group #1',
            containedMatchType: ContainedMatchType.ALL_MATCHES,
            matches: [
                {
                    id: 'DoubleElim32Team_0_0',
                    roundNumber: 8,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_1',
                    nextMatchId: 'DoubleElim32Team_0_0',
                    roundNumber: 7,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_2',
                    nextMatchId: 'DoubleElim32Team_0_1',
                    roundNumber: 6,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
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
                    id: 'DoubleElim32Team_0_3',
                    nextMatchId: 'DoubleElim32Team_0_1',
                    roundNumber: 6,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
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
                    id: 'DoubleElim32Team_0_4',
                    nextMatchId: 'DoubleElim32Team_0_2',
                    roundNumber: 5,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
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
                    id: 'DoubleElim32Team_0_5',
                    nextMatchId: 'DoubleElim32Team_0_3',
                    roundNumber: 5,
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
                        id: 7,
                        name: 'Team 7',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_6',
                    nextMatchId: 'DoubleElim32Team_0_4',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
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
                    id: 'DoubleElim32Team_0_7',
                    nextMatchId: 'DoubleElim32Team_0_4',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
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
                    id: 'DoubleElim32Team_0_8',
                    nextMatchId: 'DoubleElim32Team_0_5',
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
                        id: 10,
                        name: 'Team 10',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_9',
                    nextMatchId: 'DoubleElim32Team_0_5',
                    roundNumber: 4,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
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
                    id: 'DoubleElim32Team_0_10',
                    nextMatchId: 'DoubleElim32Team_0_6',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
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
                    id: 'DoubleElim32Team_0_11',
                    nextMatchId: 'DoubleElim32Team_0_7',
                    roundNumber: 3,
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
                        id: 13,
                        name: 'Team 13',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_12',
                    nextMatchId: 'DoubleElim32Team_0_8',
                    roundNumber: 3,
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
                        id: 14,
                        name: 'Team 14',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_13',
                    nextMatchId: 'DoubleElim32Team_0_9',
                    roundNumber: 3,
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
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_14',
                    nextMatchId: 'DoubleElim32Team_0_10',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
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
                    id: 'DoubleElim32Team_0_15',
                    nextMatchId: 'DoubleElim32Team_0_10',
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
                        id: 17,
                        name: 'Team 17',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_16',
                    nextMatchId: 'DoubleElim32Team_0_11',
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
                        id: 18,
                        name: 'Team 18',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_17',
                    nextMatchId: 'DoubleElim32Team_0_11',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_18',
                    nextMatchId: 'DoubleElim32Team_0_12',
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
                        id: 20,
                        name: 'Team 20',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_19',
                    nextMatchId: 'DoubleElim32Team_0_12',
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
                        id: 21,
                        name: 'Team 21',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_20',
                    nextMatchId: 'DoubleElim32Team_0_13',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
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
                    id: 'DoubleElim32Team_0_21',
                    nextMatchId: 'DoubleElim32Team_0_13',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 23,
                        name: 'Team 23',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_22',
                    nextMatchId: 'DoubleElim32Team_0_14',
                    roundNumber: 1,
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
                    id: 'DoubleElim32Team_0_23',
                    nextMatchId: 'DoubleElim32Team_0_15',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 25,
                        name: 'Team 25',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 17,
                        name: 'Team 17',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_24',
                    nextMatchId: 'DoubleElim32Team_0_16',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 0,
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
                    id: 'DoubleElim32Team_0_25',
                    nextMatchId: 'DoubleElim32Team_0_17',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 27,
                        name: 'Team 27',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_26',
                    nextMatchId: 'DoubleElim32Team_0_18',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 20,
                        name: 'Team 20',
                        score: 0,
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
                    id: 'DoubleElim32Team_0_27',
                    nextMatchId: 'DoubleElim32Team_0_19',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 29,
                        name: 'Team 29',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: 2,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_28',
                    nextMatchId: 'DoubleElim32Team_0_20',
                    roundNumber: 1,
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
                        id: 30,
                        name: 'Team 30',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_29',
                    nextMatchId: 'DoubleElim32Team_0_21',
                    roundNumber: 1,
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
                        id: 31,
                        name: 'Team 31',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_30',
                    nextMatchId: 'DoubleElim32Team_0_46',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 24,
                        name: 'Team 24',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_31',
                    nextMatchId: 'DoubleElim32Team_0_46',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 16,
                        name: 'Team 16',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 7,
                        name: 'Team 7',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_32',
                    nextMatchId: 'DoubleElim32Team_0_47',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 25,
                        name: 'Team 25',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_33',
                    nextMatchId: 'DoubleElim32Team_0_47',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_34',
                    nextMatchId: 'DoubleElim32Team_0_48',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 18,
                        name: 'Team 18',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_35',
                    nextMatchId: 'DoubleElim32Team_0_48',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 0,
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
                    id: 'DoubleElim32Team_0_36',
                    nextMatchId: 'DoubleElim32Team_0_49',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_37',
                    nextMatchId: 'DoubleElim32Team_0_49',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 13,
                        name: 'Team 13',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_38',
                    nextMatchId: 'DoubleElim32Team_0_50',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_39',
                    nextMatchId: 'DoubleElim32Team_0_50',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 19,
                        name: 'Team 19',
                        score: 0,
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
                    id: 'DoubleElim32Team_0_40',
                    nextMatchId: 'DoubleElim32Team_0_51',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_41',
                    nextMatchId: 'DoubleElim32Team_0_51',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 21,
                        name: 'Team 21',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 6,
                        name: 'Team 6',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_42',
                    nextMatchId: 'DoubleElim32Team_0_52',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_43',
                    nextMatchId: 'DoubleElim32Team_0_52',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 12,
                        name: 'Team 12',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_44',
                    nextMatchId: 'DoubleElim32Team_0_53',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_45',
                    nextMatchId: 'DoubleElim32Team_0_53',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 8,
                        name: 'Team 8',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 31,
                        name: 'Team 31',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_46',
                    nextMatchId: 'DoubleElim32Team_0_56',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_47',
                    nextMatchId: 'DoubleElim32Team_0_56',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 15,
                        name: 'Team 15',
                        score: 2,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_48',
                    nextMatchId: 'DoubleElim32Team_0_57',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 14,
                        name: 'Team 14',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_49',
                    nextMatchId: 'DoubleElim32Team_0_57',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 10,
                        name: 'Team 10',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_50',
                    nextMatchId: 'DoubleElim32Team_0_54',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_51',
                    nextMatchId: 'DoubleElim32Team_0_54',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_52',
                    nextMatchId: 'DoubleElim32Team_0_55',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_53',
                    nextMatchId: 'DoubleElim32Team_0_55',
                    roundNumber: 2,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_54',
                    nextMatchId: 'DoubleElim32Team_0_59',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 11,
                        name: 'Team 11',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_55',
                    nextMatchId: 'DoubleElim32Team_0_59',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_56',
                    nextMatchId: 'DoubleElim32Team_0_58',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 9,
                        name: 'Team 9',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_57',
                    nextMatchId: 'DoubleElim32Team_0_58',
                    roundNumber: 3,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_58',
                    nextMatchId: 'DoubleElim32Team_0_60',
                    roundNumber: 4,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: 'DoubleElim32Team_0_59',
                    nextMatchId: 'DoubleElim32Team_0_60',
                    roundNumber: 4,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: 'DoubleElim32Team_0_60',
                    nextMatchId: 'DoubleElim32Team_0_61',
                    roundNumber: 5,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
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
                    id: 'DoubleElim32Team_0_61',
                    roundNumber: 6,
                    type: MatchType.WINNERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 32,
                        name: 'Team 32',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 1,
                        name: 'Team 1',
                        score: 2,
                        isDisqualified: false,
                        isWinner: false
                    }
                }
            ]
        }
    ]
};