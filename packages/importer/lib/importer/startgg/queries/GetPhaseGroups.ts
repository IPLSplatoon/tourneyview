export const getPhaseGroupsQuery = `
query PhaseGroups($phaseId: ID!, $phaseGroupIds: [ID]) {
  phase(id: $phaseId) {
    bracketType
    groupCount
    name
    isExhibition
    event {
      id
      name
      tournament {
        id
        name
      }
    }
    phaseGroups(query: {filter: {id: $phaseGroupIds}}) {
      nodes {
        id
        displayIdentifier
        bracketType
        numRounds
        rounds {
          id
          bestOf
          number
        }
      }
    }
  }
}`;

export interface GetPhaseGroupsResponse {
    data: {
        phase: {
            bracketType: string
            groupCount: number
            name: string
            event: {
                id: number
                name: string
                tournament: {
                    id: number
                    name: string
                }
            }
            phaseGroups: {
                nodes: {
                    id: number
                    displayIdentifier: string
                    bracketType: string
                }[]
            }
        }
    }
}
