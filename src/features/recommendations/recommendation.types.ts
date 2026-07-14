import type { Spot } from '../../types/spot';
import type { Destination, TravelPreferences } from '../../types/travelPlan';

export interface ScoredSpot extends Spot { score: number; reason: string; distanceKm?: number; }
export interface RecommendationContext { destination: Destination; preferences: TravelPreferences; selectedIds: string[]; rejectedIds: string[]; previous?: Spot; }
