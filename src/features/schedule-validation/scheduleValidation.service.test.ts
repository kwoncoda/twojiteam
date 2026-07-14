import { describe, expect, it } from 'vitest';
import { spots } from '../../data/mock/spots';
import type { TravelPlan } from '../../types/travelPlan';
import { buildSchedule, validateSchedule } from './scheduleValidation.service';

const plan: TravelPlan = { id: 'test', title: 'test', destination: { name: '서울', latitude: 37.5, longitude: 127 }, travelDate: '2026-07-14', startTime: '17:30', preferences: { style: 'culture', pace: 'slow', companion: 'solo' }, partySize: 1, spots: [{ spot: spots[0], visitOrder: 1 }, { spot: spots[1], visitOrder: 2 }], routes: [{ durationMinutes: 20, distanceMeters: 5000, cost: 0 },], status: 'draft' };

describe('schedule validation', () => {
  it('calculates arrival and departure in order', () => { const result = buildSchedule(plan); expect(result).toHaveLength(2); expect(result[1].arrival.getTime()).toBeGreaterThan(result[0].departure.getTime()); });
  it('warns when a place is near closing time', () => { expect(validateSchedule(plan).length).toBeGreaterThan(0); });
});
