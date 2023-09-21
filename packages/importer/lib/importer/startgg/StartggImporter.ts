import { Bracket, BracketType, MatchType } from '@tourneyview/common';
import { MatchImporter } from '../../types/MatchImporter';
import {
    MatchQueryOption,
    MatchQueryParameter,
    MatchQueryResult,
    MatchQuerySelectParameter
} from '../../types/MatchQuery';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getPhasesQuery, GetPhasesResponse } from './queries/GetPhases';
import { getPhaseGroupsQuery, GetPhaseGroupsResponse } from './queries/GetPhaseGroups';
import { getEventsQuery, GetEventsResponse } from './queries/GetEvents';
import { getSetsWithPhaseGroupQuery, GetSetsWithPhaseGroupResponse } from './queries/GetSetsWithPhaseGroup';
import { getSetsQuery, GetSetsResponse } from './queries/GetSets';
import { DoubleEliminationMatchTypeQueryParameter } from '../../query/DoubleEliminationMatchTypeQueryParameter';
import { ContainedMatchType } from '@tourneyview/common';

const startggApiPath = 'https://api.start.gg/gql/alpha';

class StartggEventOption implements MatchQueryOption {
    private readonly axios: AxiosInstance;

    name: string;
    value: number;

    constructor(eventId: number, eventName: string, axios: AxiosInstance) {
        this.value = eventId;
        this.name = eventName;
        this.axios = axios;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        const phaseListResponse = await this.axios.post<GetPhasesResponse>(
            startggApiPath,
            JSON.stringify({
                query: getPhasesQuery,
                variables: {
                    eventId: this.value
                }
            }));

        return [{
            key: 'phaseId',
            name: 'Bracket',
            type: 'select',
            options: phaseListResponse.data.data.event.phases
                .map(phase => ({ ...phase, parsedBracketType: StartggImporter.parseBracketType(phase.bracketType) }))
                .filter(phase => phase.parsedBracketType != null)
                .map(phase => new StartggPhaseOption(phase.id, phase.name, phase.groupCount, phase.parsedBracketType!, this.axios))
        }]
    }
}

class StartggPhaseOption implements MatchQueryOption {
    private readonly axios: AxiosInstance;

    name: string;
    value: number;
    private readonly groupCount: number;
    private readonly bracketType: BracketType;

    constructor(phaseId: number, eventName: string, groupCount: number, bracketType: BracketType, axios: AxiosInstance) {
        this.value = phaseId;
        this.name = eventName;
        this.axios = axios;
        this.groupCount = groupCount;
        this.bracketType = bracketType;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        const result = [];

        if (this.bracketType === BracketType.DOUBLE_ELIMINATION) {
            result.push(new DoubleEliminationMatchTypeQueryParameter());
        }

        if (this.groupCount > 1) {
            const phaseGroupsResponse = await this.axios.post<GetPhaseGroupsResponse>(
                startggApiPath,
                JSON.stringify({
                    query: getPhaseGroupsQuery,
                    variables: {
                        phaseId: this.value,
                        page: 1,
                        perPage: 100
                    }
                }));

            if (phaseGroupsResponse.data.data.phase.phaseGroups.pageInfo.totalPages > 1) {
                console.warn('Found a start.gg phase with more than 100 phase groups?!');
            }

            result.push(<MatchQuerySelectParameter>{
                type: 'select',
                key: 'phaseGroupId',
                name: 'Pool',
                options: phaseGroupsResponse.data.data.phase.phaseGroups.nodes
                    .map(group => new StartggPhaseGroupOption(group.displayIdentifier, group.id, group.numRounds))
            });
        }

        return result;
    }
}

class StartggPhaseGroupOption implements MatchQueryOption {
    readonly name: string;
    readonly value: number;
    private readonly numRounds: number | null;

    constructor(displayIdentifier: string, id: number, numRounds: number | null) {
        this.name = `Pool ${displayIdentifier}`;
        this.value = id;
        this.numRounds = numRounds;
    }

    getParams(): MatchQueryParameter[] {
        if (this.numRounds == null) {
            return [];
        }

        return [{
            type: 'numberRange',
            key: 'roundNumber',
            min: 1,
            max: this.numRounds,
            name: 'Round number'
        }];
    }
}

export interface StartggImportOpts {
    phaseId: number
    phaseGroupId?: number
    roundNumber?: number
    matchType?: ContainedMatchType
}

export class StartggImporter implements MatchImporter<StartggImportOpts> {
    private readonly axios: AxiosInstance;

    constructor(token: string) {
        this.axios = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getMatchQueryOptions(tournamentId: string): Promise<MatchQueryParameter[]> {
        const eventListResponse = await this.axios.post<GetEventsResponse>(
            startggApiPath,
            JSON.stringify({
                query: getEventsQuery,
                variables: {
                    slug: tournamentId
                }
            }));

        return [{
            key: 'eventId',
            name: 'Event',
            type: 'select',
            options: eventListResponse.data.data.tournament.events
                .map(event => new StartggEventOption(event.id, event.name, this.axios))
        }]
    }

    async getMatches(opts: StartggImportOpts & MatchQueryResult): Promise<Bracket> {
        const setsPerPage = 50;
        const phaseGroupIds = opts.phaseGroupId == null ? null : [opts.phaseGroupId];

        const getSetsResponse = await this.axios.post<GetSetsWithPhaseGroupResponse>(
            startggApiPath,
            JSON.stringify({
              query: getSetsWithPhaseGroupQuery,
              variables: {
                  phaseId: opts.phaseId,
                  page: 1,
                  perPage: setsPerPage,
                  phaseGroupIds: phaseGroupIds,
                  roundNumber: opts.roundNumber
              }
            }));

        if (getSetsResponse.data.data.phase.groupCount > 1 && opts.phaseGroupId == null) {
            throw new Error('Tried to import a phase with multiple groups without specifying which group to import!');
        }

        const bracketType = StartggImporter.parseBracketType(getSetsResponse.data.data.phase.bracketType);
        if (bracketType == null) {
            throw new Error(`Unknown or unsupported bracket type "${getSetsResponse.data.data.phase.bracketType}"`);
        }

        const sets = getSetsResponse.data.data.phase.sets.nodes;
        const totalPages = getSetsResponse.data.data.phase.sets.pageInfo.totalPages;
        if (totalPages > 1) {
            const pageLoads = [];

            for (let i = 2; i <= totalPages; i++) {
                pageLoads.push(this.axios.post<GetSetsResponse>(
                    startggApiPath,
                    JSON.stringify({
                        query: getSetsQuery,
                        variables: {
                            phaseId: opts.phaseId,
                            page: i,
                            perPage: setsPerPage,
                            phaseGroupIds: phaseGroupIds,
                            roundNumber: opts.roundNumber
                        }
                    })));
            }

            sets.push(...(await Promise.all(pageLoads)).flatMap(response => response.data.data.phase.sets.nodes));
        }

        let hasBracketReset = false;
        if (bracketType === BracketType.DOUBLE_ELIMINATION) {
            sets.forEach(set => {
                if (set.fullRoundText.toLowerCase().includes('reset')) {
                    hasBracketReset = true;
                    set.round++;
                }
            })
        } else if (bracketType === BracketType.SINGLE_ELIMINATION) {
            sets.forEach(set => {
                if (set.fullRoundText.toLowerCase().includes('tiebreak')) {
                    set.round--;
                }
            })
        }

        const phaseGroup = getSetsResponse.data.data.phase.phaseGroups.nodes[0];
        return {
            type: bracketType,
            name: StartggImporter.formatBracketName(getSetsResponse.data),
            roundNumber: opts.roundNumber,
            eventName: `${getSetsResponse.data.data.phase.event.tournament.name} - ${getSetsResponse.data.data.phase.event.name}`,
            matchGroups: [
                {
                    id: String(phaseGroup.id),
                    name: `Pool ${phaseGroup.displayIdentifier}`,
                    hasBracketReset,
                    containedMatchType: opts.matchType,
                    matches: sets
                        .filter(set => {
                            if (bracketType !== BracketType.DOUBLE_ELIMINATION) {
                                return true;
                            }

                            if (opts.matchType === ContainedMatchType.WINNERS) {
                                return set.round > 0;
                            } else if (opts.matchType === ContainedMatchType.LOSERS) {
                                return set.round < 0;
                            }

                            return true;
                        })
                        .map(set => {
                            const nextSet = sets.find(set2 =>
                                (set.round < 0 && set2.round < 0 || set.round >= 0 && set2.round >= 0)
                                && set2.slots.some(slot => slot.prereqType === 'set' && slot.prereqId === String(set.id)));

                            if (set.slots.length !== 2) {
                                throw new Error(`Start.gg set contains ${set.slots.length} slots; expected 2`);
                            }

                            return {
                                id: StartggImporter.generateMatchId(phaseGroup.id, set.identifier),
                                nextMatchId: nextSet ? StartggImporter.generateMatchId(phaseGroup.id, nextSet.identifier) : null,
                                roundNumber: set.round < 0 ? Math.abs(set.round + 2) : set.round,
                                type: set.round < 0 ? MatchType.LOSERS : MatchType.WINNERS,
                                topTeam: {
                                    name: set.slots[0].entrant?.name,
                                    score: set.slots[0].standing?.stats.score.value,
                                    isDisqualified: set.slots[0].standing?.stats.score.value === -1
                                },
                                bottomTeam: {
                                    name: set.slots[1].entrant?.name,
                                    score: set.slots[1].standing?.stats.score.value,
                                    isDisqualified: set.slots[1].standing?.stats.score.value === -1
                                }
                            }
                        })
                }
            ]
        };
    }

    private static generateMatchId(phaseGroupId: number, setIdentifier: string): string {
        return `${phaseGroupId}_${setIdentifier}`;
    }

    private static formatBracketName(response: GetSetsWithPhaseGroupResponse): string {
        if (response.data.phase.groupCount > 1) {
            return `${response.data.phase.name} - Pool ${response.data.phase.phaseGroups.nodes[0].displayIdentifier}`;
        } else {
            return response.data.phase.name;
        }
    }

    static parseBracketType(bracketType: string): BracketType | null {
        switch (bracketType) {
            case 'SINGLE_ELIMINATION':
                return BracketType.SINGLE_ELIMINATION;
            case 'DOUBLE_ELIMINATION':
                return BracketType.DOUBLE_ELIMINATION;
            case 'ROUND_ROBIN':
                return BracketType.ROUND_ROBIN;
            case 'SWISS':
                return BracketType.SWISS;
            default:
                // todo: what maps to LADDER?
                return null;
        }
    }
}
