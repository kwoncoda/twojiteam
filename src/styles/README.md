# 스타일 수정 안내

- 색상, 간격, 그림자, 모서리, 반응형 기준값은 `tokens.css`에서 수정합니다.
- reset과 body 공통 규칙은 `reset.css`, `globals.css`에만 둡니다.
- 페이지 배치는 `src/pages/*/*.module.css`에서 수정합니다.
- 공통 UI는 `src/components/`와 각 컴포넌트의 CSS Module에서 수정합니다.
- 외부 데이터나 추천 화면의 카드 스타일은 해당 feature의 component 파일을 수정합니다.
