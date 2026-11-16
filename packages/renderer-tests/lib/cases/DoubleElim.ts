import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const DoubleElim: Bracket = {
    id: 'DoubleElim',
    name: 'Double Elimination',
    eventName: 'Test Event',
    type: BracketType.DOUBLE_ELIMINATION,
    matchGroups: [
        {
            id: 'DoubleElim_group_0',
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
                    id: '0_1',
                    nextMatchId: '0_0',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 2,
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
                    id: '0_2',
                    nextMatchId: '0_1',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: false
                    },
                    bottomTeam: {
                        id: 3,
                        name: 'Team 3',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_3',
                    nextMatchId: '0_1',
                    roundNumber: 2,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
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
                    id: '0_4',
                    nextMatchId: '0_2',
                    roundNumber: 1,
                    type: MatchType.LOSERS,
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
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_5',
                    nextMatchId: '0_3',
                    roundNumber: 1,
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
                        id: 2,
                        name: 'Team 2',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_6',
                    nextMatchId: '0_8',
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
                        id: 5,
                        name: 'Team 5',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_7',
                    nextMatchId: '0_8',
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
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_8',
                    nextMatchId: '0_9',
                    roundNumber: 2,
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
                        id: 1,
                        name: 'Team 1',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_9',
                    roundNumber: 3,
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
                        id: 1,
                        name: 'Team 1',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                }
            ]
        }
    ]
};