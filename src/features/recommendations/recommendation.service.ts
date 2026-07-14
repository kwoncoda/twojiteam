import { spots as mockSpots } from '../../data/mock/spots';
import { spotDetails } from '../../data/mock/spotDetails';
import type { Spot } from '../../types/spot';

export async function getSpots(): Promise<Spot[]> {
  return mockSpots.map((spot) => ({ ...spot, ...spotDetails[spot.id] }));
}
