import type { TravelPlan } from '../../types/travelPlan';
import type { ScheduleItem, ScheduleWarning } from './scheduleValidation.types';

const atMinutes = (date: Date, value: string) => { const [hours, minutes] = value.split(':').map(Number); const result = new Date(date); result.setHours(hours, minutes, 0, 0); return result; };

export function buildSchedule(plan: TravelPlan): ScheduleItem[] {
  let cursor = atMinutes(new Date(`${plan.travelDate}T00:00:00`), plan.startTime);
  return plan.spots.map((item, index) => {
    cursor = new Date(cursor.getTime() + (plan.routes[index - 1]?.durationMinutes ?? 0) * 60000);
    const arrival = new Date(cursor);
    const departure = new Date(arrival.getTime() + item.spot.durationMinutes * 60000);
    cursor = departure;
    return { spot: item.spot, arrival, departure };
  });
}

export function validateSchedule(plan: TravelPlan): ScheduleWarning[] {
  return buildSchedule(plan).flatMap<ScheduleWarning>(({ spot, arrival }) => {
    const hours = spot.openingHours.weekly[arrival.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6];
    if (!hours) return [{ spotId: spot.id, kind: 'closed' as const, message: `${spot.name}은(는) 해당 요일에 운영하지 않습니다.` }];
    const close = atMinutes(arrival, hours.close);
    if (arrival >= close) return [{ spotId: spot.id, kind: 'after-close' as const, message: `${spot.name} 도착 예상이 마감 시간 이후입니다.` }];
    if (close.getTime() - arrival.getTime() <= 60 * 60000) return [{ spotId: spot.id, kind: 'near-close' as const, message: `${spot.name} 마감까지 1시간 이내입니다.` }];
    return [];
  });
}
