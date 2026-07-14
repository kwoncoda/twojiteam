import type { Spot } from '../../types/spot';

export const spotDetails: Record<string, Partial<Spot>> = {
  'seoul-gyeongbokgung': { openingHours: { weekly: { 0: { open: '09:00', close: '18:00' }, 1: null, 2: { open: '09:00', close: '18:00' }, 3: { open: '09:00', close: '18:00' }, 4: { open: '09:00', close: '18:00' }, 5: { open: '09:00', close: '18:00' }, 6: { open: '09:00', close: '18:00' } }, note: '화요일 휴궁' } },
  'jeju-seongsan': { openingHours: { weekly: { 0: { open: '07:00', close: '20:00' }, 1: { open: '07:00', close: '20:00' }, 2: { open: '07:00', close: '20:00' }, 3: { open: '07:00', close: '20:00' }, 4: { open: '07:00', close: '20:00' }, 5: { open: '07:00', close: '20:00' }, 6: { open: '07:00', close: '20:00' } } } }
};
