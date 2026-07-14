# TRAVEL PICK

취향과 여행 조건을 반영해 국내 관광지를 고르고 여행 계획을 만드는 React 프로토타입입니다.

## 기술 스택

Vite, React, TypeScript, React Router, Supabase JavaScript Client, CSS Modules, ESLint, Vitest를 사용합니다. 상태 관리는 React Context와 custom hook을 사용하며 Redux/Zustand는 도입하지 않았습니다.

## 실행

```bash
npm install
copy .env.example .env.local
npm run dev
```

프로덕션 검증은 `npm run lint`, `npm run test`, `npm run build`로 실행합니다.

## 환경변수와 데이터 모드

`.env.local`에 `.env.example`의 값을 넣습니다. 기본 `VITE_DATA_MODE=mock`에서는 Supabase 없이 실행되며 기존 프로토타입 흐름을 확인할 수 있습니다. `VITE_DATA_MODE=supabase`로 바꾸면 Supabase 설정이 없을 때 명확한 오류를 보여줍니다.

| 변수 | 용도 | 브라우저 공개 여부 |
| --- | --- | --- |
| `VITE_DATA_MODE` | `mock`/`supabase` 선택 | 공개 가능 |
| `VITE_SUPABASE_URL` | Supabase URL | 공개 가능 |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | 공개 가능하지만 RLS 필수 |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps JavaScript API 브라우저 키 | 공개되는 값이며 referrer/API 제한 필수 |
| `VITE_TOUR_API_ENABLED` | 관광 API 사용 여부 | 공개 가능 |
| `VITE_API_BASE_URL` | 서버/Edge Function 주소 | 공개 가능 |

서비스 역할 키, TourAPI 비밀키 등 서버 전용 키는 `VITE_` 변수에 넣지 않습니다.

## Supabase

`supabase/migrations/20260714000000_initial_schema.sql`은 `spots`, `travel_plans`, `travel_plan_spots`와 소유자 기준 RLS 정책을 만들고, `supabase/seed.sql`은 개발용 관광지 3곳을 넣습니다.

Supabase CLI가 설치되어 있다면 프로젝트 연결 후 migration과 seed를 적용합니다. 인증을 연결하지 않은 현재 화면에서는 mock/localStorage 저장을 기본으로 유지합니다. Supabase 저장을 실제 사용하려면 Anonymous Sign-In 또는 별도 인증 흐름을 먼저 켜야 합니다.

## 폴더 안내

- 디자이너: `src/styles/`, `src/components/`, `src/pages/*/*.module.css`, `src/features/*/components/`
- 프론트엔드: `src/pages/`, `src/app/`, `src/features/`, `src/hooks/`
- 데이터/API: `src/data/`, `src/services/`, `src/features/plan-storage/`, `supabase/`
- 도메인 타입과 순수 계산: `src/types/`, `src/features/recommendations/`, `src/features/schedule-validation/`

## 현재 구현과 남은 작업

구현된 범위는 검색 조건(지역 fallback, 취향, 날짜, 시각, 인원), mock 추천 점수와 후보 제외, 지도 로더/마커 fallback, 계획 선택·삭제·순서 변경·이동수단 선택, 시간 경고, 비용/시간 요약, localStorage repository, Supabase client/repository 인터페이스입니다.

아직 실제 Places Autocomplete/Text Search, Directions 결과를 화면 데이터에 연결하는 작업, TourAPI 서버 프록시, 익명 로그인, 공유 링크, Day 자동 분할, 사진 표시, 완전한 Supabase plan-spot 저장은 남아 있습니다. 가짜 UI로 숨기지 않고 인터페이스와 README에 상태를 기록했습니다.

## Google Maps 키 보안

기존 `index.html`에 노출되어 있던 키는 이미 공개된 것으로 간주하고 폐기·재발급해야 합니다. 새 키는 `.env.local`에만 넣고, Google Cloud Console에서 HTTP referrer 제한, 허용 도메인, Maps JavaScript API 및 실제 사용하는 Places/Routes API만 허용하고 일일 쿼터와 예산 알림을 설정하세요. `.env.local`은 Git에 포함되지 않습니다.
