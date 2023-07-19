import axios from 'axios';
import { MatchImporter } from './types/MatchImporter';
import type { Bracket } from '@tourneyview/common';
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
    matchType: 'winner' | 'loser'
    matchNumber: number
    roundNumber: number
    isBye: boolean
    next: {
        winner: BattlefyMatchListNextNode
        loser?: BattlefyMatchListNextNode
    }
}

export class BattlefyImporter implements MatchImporter<string> {
    async getMatches(opts: string): Promise<Bracket> {
        const stageDetails = await axios.get<BattlefyStageDetails>(`https://api.battlefy.com/stages/${opts}`);
        const matchList = await axios.get<BattlefyMatchListItem[]>(`https://api.battlefy.com/stages/${opts}/matches`);

        const bracketType = this.mapBracketType(stageDetails.data.bracket.type, stageDetails.data.bracket.style);
        if (bracketType == null) {
            throw new Error(`Failed to parse bracket type for input parameters (type=${stageDetails.data.bracket.type}, style=${stageDetails.data.bracket.style})`);
        }

        if (bracketType === BracketType.SINGLE_ELIMINATION && stageDetails.data.bracket.hasThirdPlaceMatch) {
            const maxRoundNumber = Math.max(...(matchList.data.map(match => match.roundNumber)));
            const thirdPlaceMatch = matchList.data.find(match => match.matchType === 'loser');
            if (thirdPlaceMatch != null) {
                thirdPlaceMatch.roundNumber = maxRoundNumber;
            }
        }

        return {
            id: opts,
            matches: matchList.data
                .map(match => ({
                    id: match._id,
                    nextMatchId: match.next?.winner?.matchID,
                    roundNumber: match.roundNumber,
                    type: match.matchType === 'winner' ? MatchType.WINNERS : MatchType.LOSERS,
                    topTeam: {
                        name: match.top.team?.name,
                        score: match.top.score
                    },
                    bottomTeam: {
                        name: match.bottom.team?.name,
                        score: match.bottom.score
                    }
                })),
            type: bracketType
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