export const getPhasesQuery = `
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

export interface GetPhasesResponse {
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
