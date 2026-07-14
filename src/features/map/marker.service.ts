import type { Spot } from '../../types/spot';
export interface SpotMarker { marker: google.maps.Marker; spot: Spot; }
export function createMarkers(map: google.maps.Map, spots: Spot[]): SpotMarker[] { return spots.map((spot) => ({ spot, marker: new google.maps.Marker({ map, position: { lat: spot.latitude, lng: spot.longitude }, title: spot.name }) })); }
export function clearMarkers(markers: SpotMarker[]): void { markers.forEach(({ marker }) => marker.setMap(null)); }
