export const getPhaseGroupsQuery = `
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

export interface GetPhaseGroupsResponse {
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
