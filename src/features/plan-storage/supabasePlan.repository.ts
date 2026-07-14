import type { TravelPlan } from '../../types/travelPlan';
import type { PlanRepository } from './plan.repository';
import { supabase } from '../../services/supabase/supabase.client';

function unavailable(): never { throw new Error('Supabase가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.'); }
export const supabasePlanRepository: PlanRepository = {
  async getPlan(id) { if (!supabase) return unavailable(); const { data, error } = await supabase.from('travel_plans').select('*').eq('id', id).maybeSingle(); if (error) throw error; return data as TravelPlan | null; },
  async savePlan(plan) { if (!supabase) return unavailable(); const { error } = await supabase.from('travel_plans').insert({ id: plan.id, title: plan.title, destination_name: plan.destination.name, destination_latitude: plan.destination.latitude, destination_longitude: plan.destination.longitude, travel_date: plan.travelDate, start_time: plan.startTime, travel_style: plan.preferences.style, travel_pace: plan.preferences.pace, companion_type: plan.preferences.companion, party_size: plan.partySize, status: plan.status }); if (error) throw error; return plan; },
  async updatePlan(plan) { if (!supabase) return unavailable(); const { error } = await supabase.from('travel_plans').update({ title: plan.title, status: plan.status }).eq('id', plan.id); if (error) throw error; return plan; },
  async deletePlan(id) { if (!supabase) return unavailable(); const { error } = await supabase.from('travel_plans').delete().eq('id', id); if (error) throw error; }
};
