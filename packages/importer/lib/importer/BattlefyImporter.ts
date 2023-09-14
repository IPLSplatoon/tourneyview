import axios from 'axios';
import { MatchImporter } from '../types/MatchImporter';
import type { Bracket, Match, MatchGroup } from '@tourneyview/common';
import { BracketType, MatchType } from '@tourneyview/common';
import { MatchQueryOption, MatchQueryParameter, MatchQueryResult, MatchQuerySelectParameter } from '../types/MatchQuery';

interface BattlefyTournamentDetails {
    _id: string
    name: string,
    stages: BattlefyStageDetails[]
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
    next?: {
        winner: BattlefyMatchListNextNode
        loser?: BattlefyMatchListNextNode
    }
}

interface BattlefyStageGroupItem {
    _id: string
    name: string
    matches: BattlefyMatchListItem[]
}

interface BattlefyMaxRoundRobinStage {
    _id: string
    maxRound: number
}

export interface BattlefyImportOpts {
    stageId: string
    roundNumber?: number
}

const battlefyApiRoot = 'https://api.battlefy.com';

class BattlefyStageQueryOption implements MatchQueryOption {
    name: string;
    value: string;
    private readonly type: string;
    private readonly roundCount: number;

    constructor(id: string, name: string, type: string, roundCount: number) {
        this.value = id;
        this.name = name;
        this.type = type;
        this.roundCount = roundCount;
    }

    getParams(): MatchQueryParameter[] {
        if (this.type === 'swiss') {
            return [{
                key: 'roundNumber',
                type: 'numberRange',
                name: 'Round number',
                min: 1,
                max: this.roundCount
            }];
        } else {
            return [];
        }
    }
}

export class BattlefyImporter implements MatchImporter<BattlefyImportOpts> {
    async getMatchQueryOptions(tournamentId: string): Promise<MatchQuerySelectParameter[]> {
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

        return [{
            key: 'stageId',
            type: 'select',
            name: 'Bracket',
            options: tournamentDetails.data[0].stages.map(stage =>
                new BattlefyStageQueryOption(stage._id, stage.name, stage.bracket.type, stage.bracket.roundsCount))
        }];
    }

    async getMatches(opts: BattlefyImportOpts & MatchQueryResult): Promise<Bracket> {
        const stageDetails = await axios.get<BattlefyStageDetails>(`${battlefyApiRoot}/stages/${opts.stageId}`);

        const bracketType = this.mapBracketType(stageDetails.data.bracket.type, stageDetails.data.bracket.style);
        if (bracketType == null) {
            throw new Error(`Failed to parse bracket type for input parameters (type=${stageDetails.data.bracket.type}, style=${stageDetails.data.bracket.style})`);
        }

        if (bracketType === BracketType.SWISS && opts.roundNumber == null) {
            throw new Error(`A round number is required when importing brackets of type ${bracketType} from Battlefy.`);
        }

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
                matchGroups: [
                    {
                        id: opts.stageId,
                        name: stageDetails.data.name,
                        matches: matchList.data
                            .map(match => ({
                                id: match._id,
                                nextMatchId: isEliminationBracket ? match.next?.winner?.matchID : undefined,
                                roundNumber: match.roundNumber,
                                type: isEliminationBracket ? match.matchType === 'winner' ? MatchType.WINNERS : MatchType.LOSERS : undefined,
                                topTeam: {
                                    name: match.top.team?.name,
                                    score: match.top.score
                                },
                                bottomTeam: {
                                    name: match.bottom.team?.name,
                                    score: match.bottom.score
                                }
                            }))
                    }
                ]
            }
        } else if (bracketType === BracketType.ROUND_ROBIN) {
            const maxRound = await axios.get<BattlefyMaxRoundRobinStage>(`${battlefyApiRoot}/stages/${opts.stageId}/round-robin-max-round`);

            const allRounds = await Promise.all(Array.from(
                { length: maxRound.data.maxRound },
                (_, i) => axios.get<BattlefyStageGroupItem[]>(`${battlefyApiRoot}/stages/${opts.stageId}/groups/round/${i + 1}`)));

            const matchGroups = Object.values(allRounds.reduce<Record<string, MatchGroup>>((result, round) => {
                round.data.forEach(group => {
                    const matches: Match[] = group.matches.map(match => ({
                        id: match._id,
                        roundNumber: match.roundNumber,
                        topTeam: {
                            name: match.top.team?.name,
                            score: match.top.score
                        },
                        bottomTeam: {
                            name: match.bottom.team?.name,
                            score: match.bottom.score
                        }
                    }));

                    const existingGroup = result[group._id];
                    if (existingGroup == null) {
                        result[group._id] = {
                            id: group._id,
                            name: group.name,
                            matches
                        };
                    } else {
                        existingGroup.matches.push(...matches);
                    }
                });

                return result;
            }, {}));

            return {
                type: bracketType,
                name: stageDetails.data.name,
                matchGroups
            };
        } else {
            // todo: support battlefy ladders (standings + list of matches played?)
            return {
                type: bracketType,
                name: stageDetails.data.name,
                matchGroups: []
            };
        }
    }

    private mapBracketType(type: string, style?: string): BracketType | undefined {
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
