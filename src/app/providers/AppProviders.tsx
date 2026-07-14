import type { ReactNode } from 'react';
import { TravelPlanProvider } from './TravelPlanProvider';
export function AppProviders({ children }: { children: ReactNode }) { return <TravelPlanProvider>{children}</TravelPlanProvider>; }
