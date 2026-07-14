import type { TransportMode } from '../../types/travelPlan';
export interface RouteRequest { origin: google.maps.LatLngLiteral; destination: google.maps.LatLngLiteral; mode: TransportMode; }
