import type { TravelPlan } from '../../types/travelPlan';
export interface PlanRepository { getPlan(id: string): Promise<TravelPlan | null>; savePlan(plan: TravelPlan): Promise<TravelPlan>; updatePlan(plan: TravelPlan): Promise<TravelPlan>; deletePlan(id: string): Promise<void>; }
