export const getSetsQuery = `
query Sets($phaseId: ID!, $phaseGroupIds: [ID], $page: Int!, $perPage: Int!, $roundNumber: Int, $showByes: Boolean) {
  phase(id: $phaseId) {
    sets(page: $page, perPage: $perPage, sortType: ROUND, filters: {phaseGroupIds: $phaseGroupIds, roundNumber: $roundNumber, showByes: $showByes}) {
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
            id
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
                            id: number | string
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
