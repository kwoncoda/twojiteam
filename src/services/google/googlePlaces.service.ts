export interface PlaceSearchResult { placeId: string; name: string; latitude: number; longitude: number; address?: string; }
export interface PlacesService { search(query: string): Promise<PlaceSearchResult[]>; }
export const unavailablePlacesService: PlacesService = { async search() { return []; } };
