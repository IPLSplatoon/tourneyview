export const getEventsQuery = `
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

export interface GetEventsResponse {
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
