import type { Destination } from '../../types/travelPlan';
export interface DestinationSearchProps { value: string; onChange: (destination: Destination | null) => void; }
