import type { TransportMode } from '../../types/travelPlan';
export function estimateRouteCost(mode: TransportMode, meters: number, fare?: number): { amount: number; note: string } {
  if (mode === 'WALKING') return { amount: 0, note: '무료' };
  if (mode === 'TRANSIT' && fare !== undefined) return { amount: fare, note: '대중교통 예상 요금' };
  if (mode === 'TRANSIT') return { amount: 0, note: '대중교통 요금 확인 필요' };
  return { amount: Math.round(meters / 1000 * 180), note: '자동차 추정 연료비' };
}
