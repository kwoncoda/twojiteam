import type { RouteSummary, TransportMode } from '../../types/travelPlan';
import { estimateRouteCost } from './routeCost.utils';

export function requestRoute(service: google.maps.DirectionsService, origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral, mode: TransportMode): Promise<RouteSummary> {
  return new Promise((resolve) => service.route({ origin, destination, travelMode: google.maps.TravelMode[mode], ...(mode === 'TRANSIT' ? { transitOptions: { departureTime: new Date(Date.now() + 3600000) } } : {}) }, (result, status) => {
    if (status !== 'OK' || !result?.routes[0]) return resolve({ durationMinutes: 0, distanceMeters: 0, cost: 0, error: status });
    const legs = result.routes[0].legs;
    const distanceMeters = legs.reduce((sum, leg) => sum + (leg.distance?.value ?? 0), 0);
    const durationMinutes = Math.ceil(legs.reduce((sum, leg) => sum + (leg.duration?.value ?? 0), 0) / 60);
    const cost = estimateRouteCost(mode, distanceMeters, result.routes[0].fare?.value);
    resolve({ durationMinutes, distanceMeters, cost: cost.amount, costNote: cost.note });
  }));
}
