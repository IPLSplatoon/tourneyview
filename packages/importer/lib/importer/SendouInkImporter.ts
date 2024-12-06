import { Bracket, ContainedMatchType, MatchState, MatchTeam, MatchType } from '@tourneyview/common'
import { BracketType } from '@tourneyview/common'
import type { MatchImporter } from '../types/MatchImporter'
import type { MatchQueryOption, MatchQueryParameter, MatchQueryParameterValue, MatchQueryResult } from '../types/MatchQuery'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { DoubleEliminationMatchTypeQueryParameter } from '../query/DoubleEliminationMatchTypeQueryParameter'

export interface SendouInkImportOpts {
    tournamentId: number
    tournamentName: string
    bracketIndex: number
    matchType?: ContainedMatchType
    roundNumber?: number
    groupId?: number
}

interface SendouInkTournamentDetailsResponse {
    name: string
    startTime: string
    url: string
    logoUrl: string
    teams: {
        checkedInCount: number
        registeredCount: number
    }
    brackets: {
        name: string
        type: string
    }[]
}

type SendouInkMatchOpponent = {
    id: number
    score?: number
    result?: 'win' | 'loss'
} | null

enum SendouInkMatchStatus {
    // Match is waiting for results from both sides
    Locked = 0,
    // Match is waiting for result from one side
    Waiting = 1,
    // Both sides are ready to start
    Ready = 2,
    // Match is in progress
    Running = 3,
    Completed = 4
}

interface SendouInkTournamentBracketDetailsResponse {
    data: {
        stage: {
            id: number
            name: string
            number: number
            tournament_id: number
            type: string
        }[]
        group: {
            id: number
            number: number
            stage_id: number
        }[]
        round: {
            id: number
            group_id: number
            number: number
            stage_id: number
            maps: {
                count: number
                type: 'PLAY_ALL' | 'BEST_OF'
            }
        }[]
        match: {
            id: number
            group_id: number
            round_id: number
            stage_id: number
            number: number
            status: SendouInkMatchStatus
            opponent1: SendouInkMatchOpponent
            opponent2: SendouInkMatchOpponent
            lastGameFinishedAt?: number
            createdAt?: number | null
        }[]
    }
    meta: {
        // RR
        teamsPerGroup?: number
        // Swiss
        groupCount?: number
        roundCount?: number
    }
}

type SendouInkgetTournamentTeamsResponse = {
    id: number
    name: string
    registeredAt: string
    checkedIn: boolean
    url: string
    teamPageUrl: string
    logoUrl: string
    seed: number
    mapPool: {
        mode: string
        stage: {
            id: number
            name: string
        }
    }[]
    members: {
        userId: number
        name: string
        discordId: string
        battlefy: string | null
        avatarUrl: string | null
        captain: boolean
        joinedAt: string
    }[]
}[]

export class SendouInkBracketOption implements MatchQueryOption {
    value: MatchQueryParameterValue
    name: string
    private readonly tournamentId: string;
    private readonly axios: AxiosInstance;
    private readonly bracketType: BracketType;

    constructor(tournamentId: string, bracketIndex: number, bracketName: string, bracketType: BracketType, axios: AxiosInstance) {
        this.name = bracketName;
        this.value = bracketIndex;
        this.axios = axios;
        this.tournamentId = tournamentId;
        this.bracketType = bracketType;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        switch(this.bracketType) {
            case BracketType.DOUBLE_ELIMINATION:
                return [new DoubleEliminationMatchTypeQueryParameter()];
            case BracketType.ROUND_ROBIN:
            case BracketType.SWISS: {
                const bracketDetails = await this.axios.get<SendouInkTournamentBracketDetailsResponse>(`/tournament/${this.tournamentId}/brackets/${this.value}`);
                if (bracketDetails.data.data.stage.length === 0 || bracketDetails.data.data.group.length === 0) {
                    throw new Error(`sendou.ink returned no stages/groups for bracket "${this.name}" (index ${this.value}) in tournament ID ${this.tournamentId}`);
                }

                const result: MatchQueryParameter[] = [];
                
                if (this.bracketType === BracketType.SWISS) {
                    const maxRoundNumber = bracketDetails.data.meta.roundCount ?? Math.max(...bracketDetails.data.data.round.map(round => round.number), 1);
                    result.push({
                        key: 'roundNumber',
                        type: 'numberRange',
                        name: 'Round number',
                        min: 1,
                        max: maxRoundNumber
                    });
                }

                if (bracketDetails.data.data.group.length > 1) {
                    result.push({
                        key: 'groupId',
                        type: 'select',
                        name: 'Group',
                        options: bracketDetails.data.data.group.map(group => ({
                            value: group.id,
                            name: `Group ${SendouInkImporter.groupNumberToLetter(group.number)}`
                        }))
                    });
                }

                return result;
            }
            default: 
                return [];
        }
    }
}

export class SendouInkImporter implements MatchImporter<SendouInkImportOpts> {
    private readonly axios: AxiosInstance;

    constructor(token: string) {
        this.axios = axios.create({
            baseURL: 'https://sendou.ink/api',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getMatchQueryOptions(tournamentId: string): Promise<MatchQueryParameter[]> {
        const tournamentDetails = await this.axios.get<SendouInkTournamentDetailsResponse>(`/tournament/${tournamentId}`);

        return [
            {
                key: 'tournamentId',
                type: 'static',
                name: 'Tournament ID',
                value: tournamentId
            },
            {
                key: 'tournamentName',
                type: 'static',
                name: 'Tournament name',
                value: tournamentDetails.data.name
            },
            {
                key: 'bracketIndex',
                type: 'select',
                name: 'Bracket',
                options: tournamentDetails.data.brackets
                    .map((bracket, i) => ({ ...bracket, type: SendouInkImporter.parseBracketType(bracket.type), index: i }))
                    .filter(bracket => bracket.type != null)
                    .map(bracket => new SendouInkBracketOption(tournamentId, bracket.index, bracket.name, bracket.type!, this.axios ))
            }
        ];
    }

    async getMatches(opts: SendouInkImportOpts & MatchQueryResult): Promise<Bracket> {
        const bracketDetails = await this.axios.get<SendouInkTournamentBracketDetailsResponse>(`/tournament/${opts.tournamentId}/brackets/${opts.bracketIndex}`);
        if (bracketDetails.data.data.stage.length === 0 || bracketDetails.data.data.group.length === 0) {
            throw new Error(`sendou.ink returned no stages/groups for bracket #${opts.bracketIndex} in tournament ID ${opts.tournamentId}`);
        }

        const bracketType = SendouInkImporter.parseBracketType(bracketDetails.data.data.stage[0].type);
        const isEliminationBracket = bracketType === BracketType.DOUBLE_ELIMINATION || bracketType === BracketType.SINGLE_ELIMINATION;
        if (bracketType == null) {
            throw new Error(`Unknown bracket type "${bracketDetails.data.data.stage[0].type}"`);
        }

        if (bracketType === BracketType.SWISS && opts.roundNumber == null) {
            throw new Error('Cannot import swiss bracket without round number');
        }

        let round: SendouInkTournamentBracketDetailsResponse['data']['round'][number] | null = null;
        if (bracketType === BracketType.SWISS) {
            const foundRound = bracketDetails.data.data.round.find(round => 
                (opts.roundNumber == null || String(round.number) === String(opts.roundNumber)) && (opts.groupId == null || round.group_id === opts.groupId));
            if (foundRound == null) {
                throw new Error(`Could not find round with round number ${opts.roundNumber} and group ID ${opts.groupId}`);
            }
            round = foundRound;
        }

        // in sendou.ink, the grand finals/bracket reset matches are assigned to a separate "group" of matches
        // we re-assign the round numbers belonging to these groups so they come after the winners bracket rounds
        let maxWinnersRoundNumber: number | undefined;
        if (bracketType === BracketType.DOUBLE_ELIMINATION && bracketDetails.data.data.group[2] != null) {
            const winnersBracketGroup = bracketDetails.data.data.group[0];
            maxWinnersRoundNumber = Math.max(...bracketDetails.data.data.round.filter(round => round.group_id === winnersBracketGroup.id).map(round => round.number), 0);
            const grandFinalsGroup = bracketDetails.data.data.group[2];
            bracketDetails.data.data.round.forEach(round => {
                if (round.group_id === grandFinalsGroup.id) {
                    round.number = maxWinnersRoundNumber! + round.number;
                }
            });
        }

        // in sendou.ink, the third place match is in a separate "group" of matches and is assigned round number 1
        // we re-assign it to the same round number as the finals match
        if (bracketType === BracketType.SINGLE_ELIMINATION && bracketDetails.data.data.group[1] != null) {
            const maxRoundNumber = Math.max(...bracketDetails.data.data.round.map(round => round.number));
            const thirdPlaceMatchGroup = bracketDetails.data.data.group[1];
            bracketDetails.data.data.round.forEach(round => {
                if (round.group_id === thirdPlaceMatchGroup.id) {
                    round.number = maxRoundNumber;
                }
            });
        }

        const teams = await this.axios.get<SendouInkgetTournamentTeamsResponse>(`/tournament/${opts.tournamentId}/teams`);

        const teamMap: Map<number, SendouInkgetTournamentTeamsResponse[number]> = new Map();
        for (const team of teams.data) {
            teamMap.set(team.id, team);
        }
        const groupMap: Map<number, SendouInkTournamentBracketDetailsResponse['data']['group'][number]> = new Map();
        for (const group of bracketDetails.data.data.group) {
            groupMap.set(group.id, group);
        }
        const roundMap: Map<number, SendouInkTournamentBracketDetailsResponse['data']['round'][number]> = new Map();
        const matchInfoPerRoundNumberInGroup: Map<number, Map<number, { matchCount: number, roundId: number }>> = new Map();
        for (const round of bracketDetails.data.data.round) {
            roundMap.set(round.id, round);

            if (isEliminationBracket) {
                const matchInfoForRound = {
                    matchCount: bracketDetails.data.data.match.filter(match => match.round_id === round.id).length,
                    roundId: round.id
                };
                if (matchInfoPerRoundNumberInGroup.has(round.group_id)) {
                    matchInfoPerRoundNumberInGroup.get(round.group_id)!.set(round.number, matchInfoForRound);
                } else {
                    const matchInfoPerRoundNumber = new Map();
                    matchInfoPerRoundNumber.set(round.number, matchInfoForRound);
                    matchInfoPerRoundNumberInGroup.set(round.group_id, matchInfoPerRoundNumber);
                }
            }
        }

        const stage = bracketDetails.data.data.stage[0];

        function getTeam(opponent: SendouInkMatchOpponent): MatchTeam {
            if (opponent == null || opponent.id == null) {
                return {
                    id: null,
                    name: null,
                    score: null,
                    isDisqualified: false,
                    isWinner: false
                }
            }

            const participant = teamMap.get(opponent.id);
            return {
                id: opponent.id,
                name: participant?.name,
                score: opponent.score,
                isDisqualified: false,
                isWinner: opponent.result === 'win'
            }
        }

        return {
            name: stage.name,
            type: bracketType,
            roundNumber: opts.roundNumber,
            eventName: opts.tournamentName,
            eventId: String(opts.tournamentId),
            matchGroups: [
                {
                    id: opts.groupId == null ? String(stage.id) : String(opts.groupId),
                    name: opts.groupId == null || !groupMap.has(opts.groupId) ? stage.name : `Group ${SendouInkImporter.groupNumberToLetter(groupMap.get(opts.groupId)!.number)}`,
                    containedMatchType: opts.matchType,
                    matches: bracketDetails.data.data.match
                        .filter(match => {
                            if (isEliminationBracket && (match.opponent1 == null || match.opponent2 == null)) {
                                return false;
                            }

                            if (bracketType === BracketType.DOUBLE_ELIMINATION && opts.matchType !== ContainedMatchType.ALL_MATCHES) {
                                const group = groupMap.get(match.group_id);

                                if (
                                    group == null
                                    || (opts.matchType === ContainedMatchType.LOSERS && group.number !== 2)
                                    || (opts.matchType === ContainedMatchType.WINNERS && group.number === 2)
                                ) {
                                    return false;
                                }
                            }

                            if (round != null && match.round_id !== round.id) {
                                return false;
                            } else if (opts.groupId != null && match.group_id !== opts.groupId) {
                                return false;
                            }

                            return true;
                        })
                        .map(match => {
                            const group = groupMap.get(match.group_id);
                            const round = roundMap.get(match.round_id);

                            let nextMatchId: string | undefined = undefined;
                            const roundNumber = round?.number;
                            if (isEliminationBracket && roundNumber != null && matchInfoPerRoundNumberInGroup.has(match.group_id)) {
                                const matchInfoPerRoundNumber = matchInfoPerRoundNumberInGroup.get(match.group_id)!;
                                const currentRoundInfo = matchInfoPerRoundNumber.get(roundNumber);
                                const nextRoundInfo = bracketType === BracketType.DOUBLE_ELIMINATION && group?.number === 1 && roundNumber === maxWinnersRoundNumber
                                    ? matchInfoPerRoundNumberInGroup.get(bracketDetails.data.data.group[2]?.id)?.get(roundNumber + 1)
                                    : matchInfoPerRoundNumber.get(roundNumber + 1);
                                
                                if (
                                    currentRoundInfo != null && currentRoundInfo.matchCount > 0
                                    && nextRoundInfo != null && nextRoundInfo.matchCount > 0
                                ) {
                                    const nextMatchNumber = Math.ceil(match.number / (currentRoundInfo.matchCount / nextRoundInfo.matchCount));
                                    const nextMatch = bracketDetails.data.data.match.find(match => match.number === nextMatchNumber && match.round_id === nextRoundInfo.roundId);
                                    nextMatchId = String(nextMatch?.id);
                                }
                            }

                            return {
                                id: String(match.id),
                                roundNumber: round?.number,
                                nextMatchId,
                                type: isEliminationBracket && group != null
                                    ? group.number === 2 ? MatchType.LOSERS : MatchType.WINNERS
                                    : undefined,
                                state: SendouInkImporter.parseMatchState(match.status),
                                topTeam: getTeam(match.opponent1),
                                bottomTeam: getTeam(match.opponent2)
                            };
                        })
                }
            ]
        };
    }
    
    static parseBracketType(bracketType: string): BracketType | null {
        switch (bracketType) {
            case 'swiss':
                return BracketType.SWISS;
            case 'single_elimination':
                return BracketType.SINGLE_ELIMINATION;
            case 'double_elimination':
                return BracketType.DOUBLE_ELIMINATION;
            case 'round_robin':
                return BracketType.ROUND_ROBIN;
            default:
                return null;
        }
    }

    static parseMatchState(state: SendouInkMatchStatus): MatchState {
        switch (state) {
            case SendouInkMatchStatus.Waiting:
            case SendouInkMatchStatus.Ready:
            case SendouInkMatchStatus.Locked:
                return MatchState.NOT_STARTED;
            case SendouInkMatchStatus.Completed:
                return MatchState.COMPLETED;
            case SendouInkMatchStatus.Running:
                return MatchState.IN_PROGRESS;
            default:
                return MatchState.UNKNOWN;
        }
    }

    static groupNumberToLetter(groupNumber: number) {
        return String.fromCharCode(64 + groupNumber).toUpperCase();
    }
}
