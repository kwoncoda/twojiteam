import type { Spot } from '../../types/spot';

export interface ScheduleItem { spot: Spot; arrival: Date; departure: Date; }
export type ScheduleWarningKind = 'closed' | 'after-close' | 'near-close';
export interface ScheduleWarning { spotId: string; kind: ScheduleWarningKind; message: string; }
