import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const SingleElim: Bracket = {
    id: 'SingleElim',
    name: 'Single Elimination',
    eventName: 'Test Event',
    type: BracketType.SINGLE_ELIMINATION,
    matchGroups: [
        {
            id: 'SingleElim_group_0',
            name: 'Match Group #1',
            matches: [
                {
                    id: '0_0',
                    nextMatchId: '0_4',
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
                        id: 2,
                        name: 'Team 2',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_1',
                    nextMatchId: '0_4',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
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
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_2',
                    nextMatchId: '0_5',
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
                        id: 6,
                        name: 'Team 6',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_3',
                    nextMatchId: '0_5',
                    roundNumber: 1,
                    type: MatchType.WINNERS,
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
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_4',
                    nextMatchId: '0_6',
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
                        id: 4,
                        name: 'Team 4',
                        score: 0,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_5',
                    nextMatchId: '0_6',
                    roundNumber: 2,
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
                        id: 8,
                        name: 'Team 8',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    }
                },
                {
                    id: '0_6',
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
                        id: 8,
                        name: 'Team 8',
                        score: 1,
                        isDisqualified: false,
                        isWinner: false
                    }
                },
                {
                    id: '0_7',
                    roundNumber: 3,
                    type: MatchType.LOSERS,
                    state: MatchState.COMPLETED,
                    topTeam: {
                        id: 5,
                        name: 'Team 5',
                        score: 3,
                        isDisqualified: false,
                        isWinner: true
                    },
                    bottomTeam: {
                        id: 4,
                        name: 'Team 4',
                        score: 2,
                        isDisqualified: false,
                        isWinner: false
                    }
                }
            ]
        }
    ]
};