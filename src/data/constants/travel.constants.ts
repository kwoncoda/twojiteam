import type { CompanionType, TravelPace, TravelStyle, TransportMode } from '../../types/travelPlan';

export const travelStyleOptions: { value: TravelStyle; label: string }[] = [
  { value: 'culture', label: '문화·역사' }, { value: 'nature', label: '자연·풍경' }, { value: 'food', label: '맛집·카페' }, { value: 'activity', label: '체험·액티비티' }
];
export const paceOptions: { value: TravelPace; label: string }[] = [
  { value: 'slow', label: '여유롭게' }, { value: 'balanced', label: '균형 있게' }, { value: 'fast', label: '알차게' }
];
export const companionOptions: { value: CompanionType; label: string }[] = [
  { value: 'couple', label: '커플' }, { value: 'solo', label: '혼자' }, { value: 'family', label: '가족' }, { value: 'friends', label: '친구' }
];
export const transportLabels: Record<TransportMode, string> = { DRIVING: '자동차', TRANSIT: '대중교통', WALKING: '도보' };
