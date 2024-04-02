export const getPhaseGroupsQuery = `
query PhaseGroups($phaseId: ID!, $phaseGroupIds: [ID]) {
  phase(id: $phaseId) {
    bracketType
    groupCount
    name
    isExhibition
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
        bracketType
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
                name: string
                tournament: {
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
