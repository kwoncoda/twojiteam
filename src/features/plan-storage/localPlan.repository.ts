import type { TravelPlan } from '../../types/travelPlan';
import { readLocal, removeLocal, writeLocal } from '../../services/storage/localStorage.service';
import type { PlanRepository } from './plan.repository';
const key = (id: string) => `plan:${id}`;
export const localPlanRepository: PlanRepository = { async getPlan(id) { return readLocal<TravelPlan | null>(key(id), null); }, async savePlan(plan) { writeLocal(key(plan.id), plan); return plan; }, async updatePlan(plan) { writeLocal(key(plan.id), plan); return plan; }, async deletePlan(id) { removeLocal(key(id)); } };
