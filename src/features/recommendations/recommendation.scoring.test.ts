import { describe, expect, it } from 'vitest';
import { spots } from '../../data/mock/spots';
import { getRecommendations } from './recommendation.scoring';

describe('getRecommendations', () => {
  const context = { destination: { name: '서울', latitude: 37.5665, longitude: 126.978 }, preferences: { style: 'culture' as const, pace: 'slow' as const, companion: 'couple' as const }, selectedIds: [], rejectedIds: [] };
  it('returns at most three candidates and prioritizes matching style', () => {
    const result = getRecommendations(spots, context);
    expect(result).toHaveLength(3);
    expect(result[0].tags).toContain('culture');
  });
  it('does not return selected or rejected spots', () => {
    const result = getRecommendations(spots, { ...context, selectedIds: ['seoul-gyeongbokgung'], rejectedIds: ['seoul-bukchon'] });
    expect(result.some((spot) => ['seoul-gyeongbokgung', 'seoul-bukchon'].includes(spot.id))).toBe(false);
  });
});
