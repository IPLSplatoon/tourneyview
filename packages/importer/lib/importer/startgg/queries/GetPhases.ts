export const getPhasesQuery = `
query EventPhases($eventId: ID) {
  event(id: $eventId) {
    phases {
      id
      name
      groupCount
      bracketType
      phaseGroups(query: {page: 1, perPage: 1}) {
        nodes {
          id
          numRounds
        }
      }
    }
  }
}`;

export interface GetPhasesResponse {
    data: {
        event: {
            phases: {
                id: number
                name: string
                groupCount: number
                bracketType: string
                phaseGroups: {
                    nodes: [{
                        id: number
                        numRounds: number | null
                    }]
                }
            }[]
        }
    }
}
