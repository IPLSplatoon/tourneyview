export const getSetsWithPhaseGroupQuery = `
query Sets($phaseId: ID!, $phaseGroupIds: [ID], $page: Int!, $perPage: Int!, $roundNumber: Int) {
  phase(id: $phaseId) {
    bracketType
    groupCount
    name
    event {
      name
      tournament {
        name
      }
    }
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
        identifier
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

export interface GetSetsWithPhaseGroupResponse {
    data: {
        phase: {
            bracketType: string
            groupCount: number
            name: string
            event: {
                name: string
                tournament: {
                    name: string
                }
            }
            phaseGroups: {
                nodes: {
                    id: number
                    displayIdentifier: string
                }[]
            }
            sets: {
                pageInfo: {
                    totalPages: number
                }
                nodes: {
                    id: number | string
                    round: number
                    identifier: string
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
