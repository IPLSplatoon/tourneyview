import type { MatchTeam, Bracket } from '@tourneyview/common';
import { MatchState, BracketType, MatchType } from '@tourneyview/common';

interface ProgressRemovalStep {
    // In a double elimination or single elimination bracket, remove both teams and reset score for all winners bracket
    // matches where the round number is greater than this number.
    removeAfterWinnersRound?: number
    // In a double elimination bracket, remove both teams and reset score for all losers bracket matches where the
    // round number is greater than the given number.
    removeAfterLosersRound?: number
    // Change the state and team info of a particular match. Each key in the object refers to a match ID.
    matchOverrides: Record<string, {
        state: MatchState
        topTeam?: Partial<MatchTeam> | null
        bottomTeam?: Partial<MatchTeam> | null
    }>
}

const emptyMatchTeam: MatchTeam = Object.freeze({
    isDisqualified: false,
    isWinner: false
});

export const progressRemovalSteps: Record<string, ProgressRemovalStep[]> = {
    'DoubleElimLargeGroupStage': [
        {
            removeAfterWinnersRound: 2,
            removeAfterLosersRound: 3,
            matchOverrides: {
                '0_38': {
                    state: MatchState.IN_PROGRESS,
                    bottomTeam: { score: 1, isWinner: false }
                },
                '0_72': {
                    state: MatchState.NOT_STARTED,
                    topTeam: { score: null, isWinner: false },
                    bottomTeam: null
                },
                '0_39': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 0, isWinner: false }
                },
                '0_73': {
                    state: MatchState.NOT_STARTED,
                    topTeam: null,
                    bottomTeam: { score: null }
                }
            }
        }
    ],
    'DoubleElim': [
        {
            removeAfterWinnersRound: 2,
            removeAfterLosersRound: 3,
            matchOverrides: {
                '0_1': {
                    state: MatchState.NOT_STARTED,
                    topTeam: null,
                    bottomTeam: { score: null, isWinner: false }
                },
                '0_8': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 2, isWinner: false }
                },
                '0_2': {
                    state: MatchState.IN_PROGRESS,
                    bottomTeam: { score: 2, isWinner: false }
                }
            }
        },
        {
            removeAfterWinnersRound: 2,
            removeAfterLosersRound: 3,
            matchOverrides: {
                '0_1': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 1 },
                    bottomTeam: { score: 2, isWinner: false }
                }
            }
        }
    ],
    'SingleElim': [
        {
            removeAfterWinnersRound: 2,
            matchOverrides: {
                '0_4': {
                    state: MatchState.NOT_STARTED,
                    topTeam: { score: null, isWinner: false },
                    bottomTeam: null
                },
                '0_1': {
                    state: MatchState.IN_PROGRESS,
                    bottomTeam: { score: 2, isWinner: false }
                }
            }
        },
        {
            removeAfterWinnersRound: 2,
            matchOverrides: {
                '0_4': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 2, isWinner: false }
                }
            }
        }
    ],
    'RoundRobin': [
        {
            matchOverrides: {
                '0_35': {
                    state: MatchState.NOT_STARTED,
                    topTeam: { score: null },
                    bottomTeam: { score: null, isWinner: false }
                },
                '0_34': {
                    state: MatchState.NOT_STARTED,
                    bottomTeam: { score: null },
                    topTeam: { score: null, isWinner: false }
                }
            }
        },
        {
            matchOverrides: {
                '0_35': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 1 },
                    bottomTeam: { score: 1, isWinner: false }
                }
            }
        }
    ],
    'Swiss': [
        {
            matchOverrides: {
                '0_8': {
                    state: MatchState.NOT_STARTED,
                    bottomTeam: { score: null, isWinner: false }
                },
                '0_9': {
                    state: MatchState.NOT_STARTED,
                    topTeam: { score: null, isDisqualified: false },
                    bottomTeam: { score: null, isWinner: false }
                }
            }
        },
        {
            matchOverrides: {
                '0_8': {
                    state: MatchState.IN_PROGRESS,
                    bottomTeam: { score: 1, isWinner: false }
                },
                '0_9': {
                    state: MatchState.IN_PROGRESS,
                    topTeam: { score: 0, isDisqualified: false },
                    bottomTeam: { score: 0, isWinner: false }
                }
            }
        }
    ]
}

export function applyProgressRemovalStep(bracket: Bracket, step: ProgressRemovalStep) {
    const matchOverrides = { ...(step.matchOverrides ?? {}) };

    const result = {
        ...bracket,
        matchGroups: bracket.matchGroups.map((group, i) => ({
            ...group,
            matches: group.matches.map((match) => {
                if (bracket.type === BracketType.DOUBLE_ELIMINATION && (step.removeAfterWinnersRound != null || step.removeAfterLosersRound != null)) {
                    if (match.type == null) {
                        throw new Error(`Match ${match.id}: No match type`);
                    } else if (match.roundNumber == null) {
                        throw new Error(`Match ${match.id}: No round number`);
                    }

                    if (
                        (step.removeAfterWinnersRound != null && match.type === MatchType.WINNERS && match.roundNumber > step.removeAfterWinnersRound) ||
                        (step.removeAfterLosersRound != null && match.type === MatchType.LOSERS && match.roundNumber > step.removeAfterLosersRound)
                    ) {
                        return {
                            ...match,
                            state: MatchState.NOT_STARTED,
                            topTeam: emptyMatchTeam,
                            bottomTeam: emptyMatchTeam
                        };
                    }
                } else if (bracket.type === BracketType.SINGLE_ELIMINATION && step.removeAfterWinnersRound != null) {
                    if (match.roundNumber == null) {
                        throw new Error(`Match ${match.id}: No round number`);
                    }

                    if (match.roundNumber > step.removeAfterWinnersRound) {
                        return {
                            ...match,
                            state: MatchState.NOT_STARTED,
                            topTeam: emptyMatchTeam,
                            bottomTeam: emptyMatchTeam
                        };
                    }
                }

                const matchIdWithoutBase = match.id.substring(String(bracket.id).length + 1);
                const override = matchOverrides[matchIdWithoutBase];
                if (override != null) {
                    const result = { ...match };

                    if (override.topTeam === null) {
                        result.topTeam = emptyMatchTeam;
                    } else if (override.topTeam != null) {
                        result.topTeam = {
                            ...result.topTeam,
                            ...override.topTeam
                        };
                    }

                    if (override.bottomTeam === null) {
                        result.bottomTeam = emptyMatchTeam;
                    } else if (override.bottomTeam != null) {
                        result.bottomTeam = {
                            ...result.bottomTeam,
                            ...override.bottomTeam
                        };
                    }

                    if (override.state != null) {
                        result.state = override.state;
                    }

                    delete matchOverrides[matchIdWithoutBase];
                    return result;
                }

                return match;
            })
        }))
    };

    const unusedOverrides = Object.keys(matchOverrides);
    if (unusedOverrides.length > 0) {
        throw new Error(`Some specified match overrides were unused (${unusedOverrides.join(', ')})`);
    }

    return result;
}
