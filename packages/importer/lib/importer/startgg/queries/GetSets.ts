export const getSetsQuery = `
query Sets($phaseId: ID!, $phaseGroupIds: [ID], $page: Int!, $perPage: Int!, $roundNumber: Int) {
  phase(id: $phaseId) {
    bracketType
    groupCount
    name
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

export interface GetSetsResponse {
    data: {
        phase: {
            bracketType: string
            groupCount: number
            name: string
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
