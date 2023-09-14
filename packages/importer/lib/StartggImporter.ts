import { Bracket, BracketType, MatchType } from '@tourneyview/common';
import { MatchImporter } from './types/MatchImporter';
import { MatchQueryOption, MatchQueryParameter, MatchQueryResult } from './types/MatchQuery';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

const getSetsQuery = `
query Sets($phaseId: ID!, $phaseGroupIds: [ID], $page: Int!, $perPage: Int!, $roundNumber: Int) {
  phase(id: $phaseId) {
    bracketType
    groupCount
    name
    phaseGroups(query: {filter: {id: $phaseGroupIds}}) {
      nodes {
        id
        displayIdentifier
      }
    }
    sets(page: $page, perPage: $perPage, filters: {phaseGroupIds: $phaseGroupIds, roundNumber: $roundNumber}) {
      pageInfo {
        totalPages
      }
      nodes {
        id
        round
        fullRoundText
        slots(includeByes: true) {
          entrant {
            name
          }
          standing {
            stats {
              score {
                value
              }
            }
          }
          prereqType
          prereqId
        }
      }
    }
  }
}`;
interface StartggGetSetsResponse {
    data: {
        phase: {
            bracketType: string
            groupCount: number
            name: string
            phaseGroups: {
              nodes: {
                  id: number
                  displayIdentifier: string
              }[]
            }
            sets: {
                pageData: {
                    totalPages: number
                }
                nodes: {
                    id: number | string
                    round: number
                    fullRoundText: string
                    slots: {
                        entrant?: {
                            name: string
                        }
                        standing?: {
                            stats: {
                                score: {
                                    value: number
                                }
                            }
                        }
                        prereqType: string
                        prereqId: string
                    }[]
                }[]
            }
        }
    }
}

const getPhaseGroupsQuery = `
query PhaseGroups($phaseId: ID, $page: Int, $perPage: Int) {
  phase(id: $phaseId) {
    phaseGroups(query: { page: $page, perPage: $perPage }) {
      pageInfo {
        totalPages
      }
      nodes {
        id
        displayIdentifier
        numRounds
      }
    }
  }
}`;
interface StartggGetPhaseGroupsResponse {
    data: {
        phase: {
            phaseGroups: {
                pageInfo: {
                    totalPages: number
                }
                nodes: {
                    id: number
                    displayIdentifier: string
                    numRounds: number | null
                }[]
            }
        }
    }
}

const getPhasesQuery = `
query EventPhases($eventId: ID) {
  event(id: $eventId) {
    phases {
      id
      name
      groupCount
      bracketType
    }
  }
}`;
interface StartggGetPhasesResponse {
    data: {
        event: {
            phases: {
                id: number
                name: string
                groupCount: number
                bracketType: string
            }[]
        }
    }
}

const getEventsQuery = `
query TournamentEvents($slug: String) {
  tournament(slug: $slug) {
    id
    name
    events {
      id
      name
    }
  }
}`;
interface StartggGetEventsResponse {
    data: {
        tournament: {
            id: number
            name: string
            events: {
                id: number
                name: string
            }[]
        }
    }
}

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
        const phaseListResponse = await this.axios.post<StartggGetPhasesResponse>(
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
                .filter(phase => StartggImporter.parseBracketType(phase.bracketType) != null)
                .map(phase => new StartggPhaseOption(phase.id, phase.name, phase.groupCount, this.axios))
        }]
    }
}

class StartggPhaseOption implements MatchQueryOption {
    private readonly axios: AxiosInstance;

    name: string;
    value: number;
    private readonly groupCount: number;

    constructor(phaseId: number, eventName: string, groupCount: number, axios: AxiosInstance) {
        this.value = phaseId;
        this.name = eventName;
        this.axios = axios;
        this.groupCount = groupCount;
    }

    async getParams(): Promise<MatchQueryParameter[]> {
        if (this.groupCount <= 1) {
            return [];
        }

        const phaseGroupsResponse = await this.axios.post<StartggGetPhaseGroupsResponse>(
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

        return [{
            type: 'select',
            key: 'phaseGroupId',
            name: 'Pool',
            options: phaseGroupsResponse.data.data.phase.phaseGroups.nodes
                .map(group => new StartggPhaseGroupOption(group.displayIdentifier, group.id, group.numRounds))
        }]
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
        const eventListResponse = await this.axios.post<StartggGetEventsResponse>(
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
        const getSetsResponse = await this.axios.post<StartggGetSetsResponse>(
            startggApiPath,
            JSON.stringify({
              query: getSetsQuery,
              variables: {
                  phaseId: opts.phaseId,
                  page: 1,
                  perPage: 100,
                  phaseGroupIds: opts.phaseGroupId == null ? null : [opts.phaseGroupId],
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

        // todo: pagination
        const sets = getSetsResponse.data.data.phase.sets.nodes;
        if (bracketType === BracketType.DOUBLE_ELIMINATION) {
            sets.forEach(set => {
                if (set.fullRoundText.toLowerCase().includes('reset')) {
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

        return {
            type: bracketType,
            name: StartggImporter.formatBracketName(getSetsResponse.data),
            roundNumber: opts.roundNumber,
            matchGroups: [
                {
                    // todo: this id varies between brackets that are not started (containing "preview" matches)
                    // and ongoing brackets - should we generate our own?
                    id: String(getSetsResponse.data.data.phase.phaseGroups.nodes[0].id),
                    name: '',
                    matches: sets.map(set => {
                        const nextMatch = sets.find(set2 =>
                            (set.round < 0 && set2.round < 0 || set.round >= 0 && set2.round >= 0)
                            && set2.slots.some(slot => slot.prereqType === 'set' && slot.prereqId === String(set.id)));

                        if (set.slots.length !== 2) {
                            throw new Error(`Start.gg set contains ${set.slots.length} slots; expected 2`);
                        }

                        return {
                            id: String(set.id),
                            nextMatchId: nextMatch?.id.toString(),
                            roundNumber: set.round < 0 ? Math.abs(set.round + 2) : set.round,
                            type: set.round < 0 ? MatchType.LOSERS : MatchType.WINNERS,
                            topTeam: {
                                name: set.slots[0].entrant?.name,
                                score: set.slots[0].standing?.stats.score.value
                            },
                            bottomTeam: {
                                name: set.slots[1].entrant?.name,
                                score: set.slots[1].standing?.stats.score.value
                            }
                        }
                    })
                }
            ]
        };
    }

    private static formatBracketName(response: StartggGetSetsResponse): string {
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
