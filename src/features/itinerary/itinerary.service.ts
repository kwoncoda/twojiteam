import type { TravelPlan } from '../../types/travelPlan';
import type { ItineraryTotals } from './itinerary.types';
export function getItineraryTotals(plan: TravelPlan): ItineraryTotals { return { visitMinutes: plan.spots.reduce((sum, item) => sum + item.spot.durationMinutes, 0), travelMinutes: plan.routes.reduce((sum, route) => sum + (route?.durationMinutes ?? 0), 0), estimatedCost: plan.spots.reduce((sum, item) => sum + item.spot.feeAmount * plan.partySize, 0) + plan.routes.reduce((sum, route) => sum + (route?.cost ?? 0), 0) }; }
