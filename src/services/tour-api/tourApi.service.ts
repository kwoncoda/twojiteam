export interface TourApiService { searchSpots(query: string): Promise<never[]>; }
export const tourApiService: TourApiService = { async searchSpots() { return []; } };
