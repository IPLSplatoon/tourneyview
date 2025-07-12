import { Bracket, BracketType, MatchState, MatchType } from '@tourneyview/common';
import { MatchImporter } from '../../types/MatchImporter';
import {
    MatchQueryNumberRangeParameter,
    MatchQueryOption,
    MatchQueryParameter,
    MatchQueryResult,
    MatchQuerySelectParameter
} from '../../types/MatchQuery';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getPhasesQuery, GetPhasesResponse } from './queries/GetPhases';
import { getPhaseGroupsForPhaseQuery, GetPhaseGroupsForPhaseResponse } from './queries/GetPhaseGroupsForPhase';
import { getEventsQuery, GetEventsResponse } from './queries/GetEvents';
import { getPhaseGroupsQuery, GetPhaseGroupsResponse } from './queries/GetPhaseGroups';
import { getSetsQuery, GetSetsResponse } from './queries/GetSets';
import { DoubleEliminationMatchTypeQueryParameter } from '../../query/DoubleEliminationMatchTypeQueryParameter';
import { ContainedMatchType } from '@tourneyview/common';

const startggApiPath = 'https://api.start.gg/gql/alpha';

// When getting info about DE brackets, the start.gg API seems to sometimes return null as the "numRounds" property and a number some other times.
// We only want to set a round number when it is actually necessary, meaning we only ask for it when we're dealing with swiss stages.
function shouldShowRoundNumberOption(bracketType: BracketType): boolean {
    return bracketType === BracketType.SWISS;
}

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
                .map(phase => {
                    if (phase.groupCount === 1 && phase.phaseGroups.nodes.length !== 1) {
                        throw new Error('Received phase from start.gg where groupCount === 1 but number of phase groups is not 1?');
                    }

                    return new StartggPhaseOption(
                        phase.id,
                        phase.name,
                        phase.groupCount,
                        phase.parsedBracketType!,
                        phase.groupCount === 1 ? phase.phaseGroups.nodes[0].numRounds : null,
                        this.axios);
                })
        }]
    }
}

class StartggPhaseOption implements MatchQueryOption {
    private readonly axios: AxiosInstance;

    name: string;
    value: number;
    private readonly groupCount: number;
    private readonly bracketType: BracketType;
    private readonly numRounds: number | null;

    constructor(phaseId: number, eventName: string, groupCount: number, bracketType: BracketType, numRounds: number | null, axios: AxiosInstance) {
        this.value = phaseId;
        this.name = eventName;
        this.axios = axios;
        this.groupCount = groupCount;
        this.bracketType = bracketType;
        this.numRounds = numRounds;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        const result = [];

        if (this.bracketType === BracketType.DOUBLE_ELIMINATION) {
            result.push(new DoubleEliminationMatchTypeQueryParameter());
        }

        if (this.groupCount > 1) {
            const phaseGroupsResponse = await this.axios.post<GetPhaseGroupsForPhaseResponse>(
                startggApiPath,
                JSON.stringify({
                    query: getPhaseGroupsForPhaseQuery,
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
                options: phaseGroupsResponse.data.data.phase.phaseGroups.nodes.map(group =>
                    new StartggPhaseGroupOption(group.displayIdentifier, group.id, group.numRounds, this.bracketType))
            });
        } else if (this.groupCount === 1 && this.numRounds != null && shouldShowRoundNumberOption(this.bracketType)) {
            result.push(<MatchQueryNumberRangeParameter>{
                type: 'numberRange',
                key: 'roundNumber',
                min: 1,
                max: this.numRounds,
                name: 'Round number'
            })
        }

        return result;
    }
}

class StartggPhaseGroupOption implements MatchQueryOption {
    readonly name: string;
    readonly value: number;
    private readonly numRounds: number | null;
    private readonly bracketType: BracketType;

    constructor(displayIdentifier: string, id: number, numRounds: number | null, bracketType: BracketType) {
        this.name = `Pool ${displayIdentifier}`;
        this.value = id;
        this.numRounds = numRounds;
        this.bracketType = bracketType;
    }

    getParams(): MatchQueryParameter[] {
        if (this.numRounds == null || !shouldShowRoundNumberOption(this.bracketType)) {
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
        // todo: support importing multiple phase groups in swiss (and other bracket types?)
        const phaseGroupIds = opts.phaseGroupId == null ? null : [opts.phaseGroupId];

        const getPhaseGroupsResponse = await this.axios.post<GetPhaseGroupsResponse>(
            startggApiPath,
            JSON.stringify({
              query: getPhaseGroupsQuery,
              variables: {
                  phaseId: opts.phaseId,
                  phaseGroupIds,
              }
            }));

        const phaseGroupCount = getPhaseGroupsResponse.data.data.phase.groupCount;
        if (phaseGroupCount > 1 && opts.phaseGroupId == null) {
            throw new Error('Tried to import a phase with multiple groups without specifying which group to import!');
        }

        const bracketType = StartggImporter.parseBracketType(getPhaseGroupsResponse.data.data.phase.bracketType);
        if (bracketType == null) {
            throw new Error(`Unknown or unsupported bracket type "${getPhaseGroupsResponse.data.data.phase.bracketType}"`);
        }

        const showByes = bracketType === BracketType.SWISS;
        const getSetsResponse = await this.axios.post<GetSetsResponse>(
            startggApiPath,
            JSON.stringify({
                query: getSetsQuery,
                variables: {
                    phaseId: opts.phaseId,
                    page: 1,
                    perPage: setsPerPage,
                    phaseGroupIds,
                    roundNumber: opts.roundNumber,
                    showByes
                }
            }));

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

        const maxLosersRoundNum = Math.max(...sets.filter(set => set.round < 0).map(set => set.round));

        const phaseGroup = getPhaseGroupsResponse.data.data.phase.phaseGroups.nodes[0];
        return {
            type: bracketType,
            name: getPhaseGroupsResponse.data.data.phase.name,
            roundNumber: opts.roundNumber,
            eventName: getPhaseGroupsResponse.data.data.phase.event.name,
            eventId: String(getPhaseGroupsResponse.data.data.phase.event.id),
            tournamentName: getPhaseGroupsResponse.data.data.phase.event.tournament.name,
            tournamentId: String(getPhaseGroupsResponse.data.data.phase.event.tournament.id),
            matchGroups: [
                {
                    id: String(phaseGroup.id),
                    name: phaseGroupCount > 1 ? `Pool ${phaseGroup.displayIdentifier}` : getPhaseGroupsResponse.data.data.phase.name,
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

                            let type: MatchType | undefined = undefined;
                            const fullRoundText = set.fullRoundText.toLowerCase();
                            if (bracketType === BracketType.DOUBLE_ELIMINATION) {
                                type = set.round < 0 ? MatchType.LOSERS : MatchType.WINNERS;
                                if (fullRoundText.includes('reset')) {
                                    set.round++;
                                }
                            } else if (bracketType === BracketType.SINGLE_ELIMINATION) {
                                if (fullRoundText.includes('tiebreak')) {
                                    type = MatchType.LOSERS;
                                    set.round--;
                                } else {
                                    type = MatchType.WINNERS;
                                }
                            }

                            return {
                                id: StartggImporter.generateMatchId(phaseGroup.id, set.identifier),
                                nextMatchId: nextSet ? StartggImporter.generateMatchId(phaseGroup.id, nextSet.identifier) : null,
                                roundNumber: set.round < 0 ? Math.abs(set.round - (maxLosersRoundNum + 1)) : set.round,
                                type,
                                state: StartggImporter.mapState(set.state),
                                topTeam: {
                                    id: set.slots[0].entrant?.id,
                                    name: set.slots[0].entrant?.name,
                                    score: set.slots[0].standing?.stats.score.value,
                                    isDisqualified: set.slots[0].standing?.stats.score.value === -1,
                                    isWinner: set.slots[0].entrant?.id === set.winnerId,
                                    seed: set.slots[0].seed?.seedNum
                                },
                                bottomTeam: {
                                    id: set.slots[1].entrant?.id,
                                    name: set.slots[1].entrant?.name,
                                    score: set.slots[1].standing?.stats.score.value,
                                    isDisqualified: set.slots[1].standing?.stats.score.value === -1,
                                    isWinner: set.slots[1].entrant?.id === set.winnerId,
                                    seed: set.slots[1].seed?.seedNum
                                }
                            }
                        })
                }
            ]
        };
    }

    private static mapState(state: number): MatchState {
        switch (state) {
            case 1:
                return MatchState.NOT_STARTED;
            case 2:
                return MatchState.IN_PROGRESS;
            case 3:
                return MatchState.COMPLETED;
            default:
                return MatchState.UNKNOWN;
        }
    }

    private static generateMatchId(phaseGroupId: number, setIdentifier: string): string {
        return `${phaseGroupId}_${setIdentifier}`;
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
