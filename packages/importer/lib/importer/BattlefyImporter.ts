import axios from 'axios';
import { MatchImporter } from '../types/MatchImporter';
import type { Bracket } from '@tourneyview/common';
import { BracketType, MatchState, MatchType } from '@tourneyview/common';
import { MatchQueryOption, MatchQueryParameter, MatchQueryResult } from '../types/MatchQuery';
import { DoubleEliminationMatchTypeQueryParameter } from '../query/DoubleEliminationMatchTypeQueryParameter';
import { ContainedMatchType } from '@tourneyview/common';

interface BattlefyTournamentDetails {
    _id: string
    name: string
    stages: BattlefyStageDetails[]
}

interface BattlefyStageGroup {
    _id: string
    name: string
}

interface BattlefyStageDetails {
    _id: string
    name: string
    bracket: {
        type: string
        style?: string
        hasThirdPlaceMatch: boolean
        roundsCount: number
    }
    groups?: BattlefyStageGroup[]
}

interface BattlefyMatchListTeam {
    seedNumber: number
    winner: boolean
    disqualified: boolean
    teamID: string
    score: number
    team: {
        _id: string
        name: string
    }
}

interface BattlefyMatchListNextNode {
    position: 'top'
    matchID: string
}

interface BattlefyMatchListItem {
    _id: string
    top: BattlefyMatchListTeam
    bottom: BattlefyMatchListTeam
    matchType?: 'winner' | 'loser'
    matchNumber: number
    roundNumber: number
    isBye: boolean
    isComplete?: boolean
    next?: {
        winner: BattlefyMatchListNextNode
        loser?: BattlefyMatchListNextNode
    }
}

export interface BattlefyImportOpts {
    tournamentId: string
    stageId: string
    roundNumber?: number
    matchType?: ContainedMatchType
    groupId?: string
}

const battlefyApiRoot = 'https://api.battlefy.com';

class BattlefyStageQueryOption implements MatchQueryOption {
    name: string;
    value: string;
    private readonly type: string;
    private readonly roundCount: number;
    private readonly style?: string;

    constructor(id: string, name: string, type: string, style: string | undefined, roundCount: number) {
        this.value = id;
        this.name = name;
        this.type = type;
        this.style = style;
        this.roundCount = roundCount;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        const bracketType = BattlefyImporter.parseBracketType(this.type, this.style);

        switch (bracketType) {
            case BracketType.SWISS:
                return [{
                    key: 'roundNumber',
                    type: 'numberRange',
                    name: 'Round number',
                    min: 1,
                    max: this.roundCount
                }];
            case BracketType.DOUBLE_ELIMINATION:
                return [new DoubleEliminationMatchTypeQueryParameter()];
            case BracketType.ROUND_ROBIN: {
                const stageDetails = await axios.get<BattlefyStageDetails[]>(
                    `${battlefyApiRoot}/stages/${this.value}`,
                    { params: { 'extend[groups]': true } });

                if (stageDetails.data.length === 0) {
                    throw new Error('Battlefy returned 0 stages without an error?');
                } else if (stageDetails.data.length > 1) {
                    console.warn(`Battlefy returned ${stageDetails.data.length} stages? (Expected 1)`);
                }

                return [{
                    key: 'groupId',
                    type: 'select',
                    name: 'Group',
                    options: stageDetails.data[0].groups!.map(group => ({ value: group._id, name: `Group ${group.name}` }))
                }];
            }
            default:
                return [];
        }
    }
}

export class BattlefyImporter implements MatchImporter<BattlefyImportOpts> {
    private async getTournamentDetails(tournamentId: string): Promise<BattlefyTournamentDetails> {
        const tournamentDetails = await axios.get<BattlefyTournamentDetails[]>(`${battlefyApiRoot}/tournaments/${tournamentId}`, {
            params: {
                'extend[stages][$query][deletedAt][$exists]': false,
                'extend[stages][$opts][name]': 1,
                'extend[stages][$opts][bracket]': 1
            }
        });

        if (tournamentDetails.data.length !== 1) {
            throw new Error(`Expected to get details for 1 tournament; Battlefy returned ${tournamentDetails.data.length} tournaments?`);
        }

        return tournamentDetails.data[0];
    }

    async getMatchQueryOptions(tournamentId: string): Promise<MatchQueryParameter[]> {
        const tournamentDetails = await this.getTournamentDetails(tournamentId);

        return [
            {
                key: 'tournamentId',
                type: 'static',
                name: 'Tournament ID',
                value: tournamentId
            },
            {
                key: 'stageId',
                type: 'select',
                name: 'Bracket',
                options: tournamentDetails.stages.map(stage =>
                    new BattlefyStageQueryOption(stage._id, stage.name, stage.bracket.type, stage.bracket.style, stage.bracket.roundsCount))
            }
        ];
    }

    // todo: isDisqualified
    async getMatches(opts: BattlefyImportOpts & MatchQueryResult): Promise<Bracket> {
        const stageDetails = await axios.get<BattlefyStageDetails>(`${battlefyApiRoot}/stages/${opts.stageId}`);

        const bracketType = BattlefyImporter.parseBracketType(stageDetails.data.bracket.type, stageDetails.data.bracket.style);
        if (bracketType == null) {
            throw new Error(`Failed to parse bracket type for input parameters (type=${stageDetails.data.bracket.type}, style=${stageDetails.data.bracket.style})`);
        }

        if (bracketType === BracketType.SWISS && opts.roundNumber == null) {
            throw new Error(`A round number is required when importing brackets of type ${bracketType} from Battlefy.`);
        }

        if (bracketType === BracketType.ROUND_ROBIN && opts.groupId == null) {
            throw new Error('Round Robin brackets must be imported from Battlefy with a group ID.');
        }

        const tournamentDetails = await this.getTournamentDetails(opts.tournamentId);

        if ([BracketType.SWISS, BracketType.SINGLE_ELIMINATION, BracketType.DOUBLE_ELIMINATION].includes(bracketType)) {
            const matchListUrl = new URL(`${battlefyApiRoot}/stages/${opts.stageId}/matches`)
            if (bracketType === BracketType.SWISS) {
                matchListUrl.searchParams.append('roundNumber', String(opts.roundNumber));
            }

            const matchList = await axios.get<BattlefyMatchListItem[]>(matchListUrl.toString());

            if (bracketType === BracketType.SINGLE_ELIMINATION && stageDetails.data.bracket.hasThirdPlaceMatch) {
                const maxRoundNumber = Math.max(...(matchList.data.map(match => match.roundNumber)));
                const thirdPlaceMatch = matchList.data.find(match => match.matchType === 'loser');
                if (thirdPlaceMatch != null) {
                    thirdPlaceMatch.roundNumber = maxRoundNumber;
                }
            }

            const isEliminationBracket = bracketType === BracketType.SINGLE_ELIMINATION || bracketType === BracketType.DOUBLE_ELIMINATION;

            return {
                name: stageDetails.data.name,
                type: bracketType,
                roundNumber: opts.roundNumber,
                eventName: tournamentDetails.name,
                eventId: opts.tournamentId,
                matchGroups: [
                    {
                        id: opts.stageId,
                        name: stageDetails.data.name,
                        containedMatchType: opts.matchType,
                        matches: matchList.data
                            .filter(match => {
                                if (isEliminationBracket && match.isBye) {
                                    return false;
                                }

                                if (bracketType !== BracketType.DOUBLE_ELIMINATION) {
                                    return true;
                                }

                                if (opts.matchType === ContainedMatchType.WINNERS) {
                                    return match.matchType === 'winner';
                                } else if (opts.matchType === ContainedMatchType.LOSERS) {
                                    return match.matchType === 'loser';
                                }

                                return true;
                            })
                            .map(match => ({
                                id: match._id,
                                nextMatchId: isEliminationBracket ? match.next?.winner?.matchID : undefined,
                                roundNumber: match.roundNumber,
                                type: isEliminationBracket ? match.matchType === 'winner' ? MatchType.WINNERS : MatchType.LOSERS : undefined,
                                state: BattlefyImporter.getMatchState(match),
                                topTeam: {
                                    id: match.top.team?._id,
                                    name: match.top.team?.name,
                                    score: match.top.score,
                                    seed: match.top.seedNumber,
                                    isDisqualified: false,
                                    isWinner: match.top.winner
                                },
                                bottomTeam: {
                                    id: match.bottom.team?._id,
                                    name: match.bottom.team?.name,
                                    score: match.bottom.score,
                                    seed: match.bottom.seedNumber,
                                    isDisqualified: false,
                                    isWinner: match.bottom.winner
                                }
                            }))
                    }
                ]
            }
        } else if (bracketType === BracketType.ROUND_ROBIN) {
            const groupInfo = await axios.get<BattlefyStageGroup>(`${battlefyApiRoot}/groups/${opts.groupId}`);
            const matches = await axios.get<BattlefyMatchListItem[]>(`${battlefyApiRoot}/groups/${opts.groupId}/matches`);

            return {
                type: bracketType,
                name: stageDetails.data.name,
                eventName: tournamentDetails.name,
                matchGroups: [{
                    id: opts.groupId!,
                    name: `Group ${groupInfo.data.name}`,
                    matches: matches.data.map(match => ({
                        id: match._id,
                        roundNumber: match.roundNumber,
                        state: BattlefyImporter.getMatchState(match),
                        topTeam: {
                            id: match.top.team?._id,
                            name: match.top.team?.name,
                            score: match.top.score,
                            isDisqualified: false,
                            isWinner: match.top.winner
                        },
                        bottomTeam: {
                            id: match.bottom.team?._id,
                            name: match.bottom.team?.name,
                            score: match.bottom.score,
                            isDisqualified: false,
                            isWinner: match.bottom.winner
                        }
                    }))
                }]
            };
        } else {
            // todo: support battlefy ladders (standings + list of matches played?)
            return {
                type: bracketType,
                name: stageDetails.data.name,
                eventName: tournamentDetails.name,
                matchGroups: []
            };
        }
    }

    private static getMatchState(match: BattlefyMatchListItem): MatchState {
        if (match.isComplete) {
            return MatchState.COMPLETED;
        } else {
            // todo: this is a lazy solution, and battlefy wasn't cooperating with me tonight; can we check something other whether score has been reported or not?
            return (match.top?.score ?? 0) + (match.bottom?.score ?? 0) > 0 ? MatchState.IN_PROGRESS : MatchState.NOT_STARTED;
        }
    }

    static parseBracketType(type: string, style?: string): BracketType | undefined {
        if (type === 'elimination') {
            if (style == null) {
                throw new Error('Got bracket type "elimination" from Battlefy without "style" parameter (single or double?)');
            }

            return {
                single: BracketType.SINGLE_ELIMINATION,
                double: BracketType.DOUBLE_ELIMINATION
            }[style];
        }

        return {
            ladder: BracketType.LADDER,
            swiss: BracketType.SWISS,
            roundrobin: BracketType.ROUND_ROBIN
        }[type];
    }
}
