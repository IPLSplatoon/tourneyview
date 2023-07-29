import axios from 'axios';
import { MatchImporter } from './types/MatchImporter';
import type { Bracket, Match, MatchGroup } from '@tourneyview/common';
import { BracketType, MatchType } from '@tourneyview/common';

interface BattlefyStageDetails {
    name: string
    bracket: {
        type: string
        style?: string
        hasThirdPlaceMatch: boolean
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

const battlefyApiRoot = 'https://api.battlefy.com';

export class BattlefyImporter implements MatchImporter<{ id: string, roundNumber?: string }> {
    async getMatches(opts: { id: string, roundNumber?: string }): Promise<Bracket> {
        const stageDetails = await axios.get<BattlefyStageDetails>(`${battlefyApiRoot}/stages/${opts.id}`);

        const bracketType = this.mapBracketType(stageDetails.data.bracket.type, stageDetails.data.bracket.style);
        if (bracketType == null) {
            throw new Error(`Failed to parse bracket type for input parameters (type=${stageDetails.data.bracket.type}, style=${stageDetails.data.bracket.style})`);
        }

        if (bracketType === BracketType.SWISS && opts.roundNumber == null) {
            throw new Error(`A round number is required when importing brackets of type ${bracketType} from Battlefy.`);
        }

        if ([BracketType.SWISS, BracketType.SINGLE_ELIMINATION, BracketType.DOUBLE_ELIMINATION].includes(bracketType)) {
            const matchListUrl = new URL(`${battlefyApiRoot}/stages/${opts.id}/matches`)
            if (bracketType === BracketType.SWISS) {
                matchListUrl.searchParams.append('roundNumber', opts.roundNumber!);
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
                matchGroups: [
                    {
                        id: opts.id,
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
            const maxRound = await axios.get<BattlefyMaxRoundRobinStage>(`${battlefyApiRoot}/stages/${opts.id}/round-robin-max-round`);

            const allRounds = await Promise.all(Array.from(
                { length: maxRound.data.maxRound },
                (_, i) => axios.get<BattlefyStageGroupItem[]>(`${battlefyApiRoot}/stages/${opts.id}/groups/round/${i + 1}`)));

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