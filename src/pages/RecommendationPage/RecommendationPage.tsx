import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer/PageContainer';
import { Button } from '../../components/common/Button/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';
import { TravelMap } from '../../features/map/components/TravelMap';
import { RecommendationCard } from '../../features/recommendations/components/RecommendationCard';
import type { ScoredSpot } from '../../features/recommendations/recommendation.types';
import { getRecommendations } from '../../features/recommendations/recommendation.scoring';
import { getSpots } from '../../features/recommendations/recommendation.service';
import { useTravelPlan } from '../../app/providers/TravelPlanProvider';
import styles from './RecommendationPage.module.css';

export function RecommendationPage() {
  const navigate = useNavigate(); const { plan, addSpot } = useTravelPlan(); const [allSpots, setAllSpots] = useState<Awaited<ReturnType<typeof getSpots>>>([]); const [rejected, setRejected] = useState<string[]>([]); const [current, setCurrent] = useState<ScoredSpot | undefined>(); const [error, setError] = useState('');
  useEffect(() => { if (!plan) { navigate('/'); return; } void getSpots().then(setAllSpots).catch(() => setError('관광지 데이터를 불러오지 못했습니다.')); }, [navigate, plan]);
  const candidates = useMemo(() => plan ? getRecommendations(allSpots, { destination: plan.destination, preferences: plan.preferences, selectedIds: plan.spots.map((item) => item.spot.id), rejectedIds: rejected, previous: plan.spots.at(-1)?.spot }, 3) : [], [allSpots, plan, rejected]);
  const choose = (spot: ScoredSpot) => { setCurrent(spot); };
  const reject = (spot: ScoredSpot) => { setRejected((ids) => [...ids, spot.id]); if (current?.id === spot.id) setCurrent(undefined); };
  if (!plan) return null;
  const finish = () => { if (current) addSpot(current); navigate('/review'); };
  return <PageContainer className={styles.page}><div className={styles.layout}><TravelMap spots={candidates} selected={plan.spots.map((item) => item.spot)} current={current} onError={setError} /><section className={styles.panel} aria-live="polite"><div className="progress">{plan.spots.length + 1}번째 추천</div><h2>{plan.destination.name}에서 어디가 좋을까요?</h2><p className="hint">취향과 이동거리를 반영한 후보 3곳입니다. 마음에 드는 곳을 고르거나 다음 후보를 확인하세요.</p>{error && <ErrorMessage message={error} />}<div className={styles.cards}>{candidates.length ? candidates.map((spot) => <RecommendationCard key={spot.id} spot={spot} selected={current?.id === spot.id} onSelect={() => choose(spot)} onReject={() => reject(spot)} />) : <div className="complete">추천 후보를 모두 확인했습니다. 계획을 완성하거나 처음부터 다시 시작하세요.</div>}</div><div className={styles.actions}><Button variant="secondary" type="button" onClick={() => navigate('/')}>처음부터</Button><Button type="button" disabled={!current} onClick={finish}>이 장소 선택</Button><Button variant="secondary" type="button" disabled={!plan.spots.length} onClick={() => navigate('/review')}>계획 검토</Button></div><div className={styles.selected}><h3>내 여행 목록</h3>{plan.spots.length ? <ol>{plan.spots.map((item) => <li key={item.spot.id}>{item.spot.name}</li>)}</ol> : <p>아직 선택한 장소가 없습니다.</p>}</div></section></div></PageContainer>;
}
