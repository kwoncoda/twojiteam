# Tasks: Personalized Travel Recommendations

**Input**: Design documents from `/specs/001-personalized-travel-recommendations/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No separate automated test tasks were requested; validation follows
the runnable scenarios in quickstart.md.

**Organization**: Tasks are grouped by user story so each story can be
implemented and validated as an independent increment.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the self-contained browser entry point.

- [X] T001 Create the single-page application entry point in `index.html`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared markup, state, catalog, and ranking behavior
needed by every user story.

- [X] T002 Add semantic page structure, responsive layout foundation, and status regions in `index.html`
- [X] T003 Add destination catalog, catalog version, and supported preference constants in `index.html`
- [X] T004 Add localStorage read/write helpers with validation and in-memory fallback in `index.html`
- [X] T005 Add deterministic budget-and-schedule ranking with optional preference scoring and match reasons in `index.html`

**Checkpoint**: Shared application foundation is ready; user story work can
begin sequentially because all stories update the same single HTML file.

## Phase 3: User Story 1 - Get a Shortlist (Priority: P1) MVP

**Goal**: Let a traveler enter required preferences and receive a ranked,
explainable destination shortlist.

**Independent Test**: Submit valid budget, departure period, and trip duration;
verify immediate progress feedback, ranked results, match reasons, and saved
session data.

- [X] T006 [US1] Add required preference form controls and validation messages in `index.html`
- [X] T007 [US1] Implement recommendation submission, loading state, and ranked shortlist rendering in `index.html`
- [X] T008 [US1] Implement empty, near-match, stale-data, and request-error states with recovery actions in `index.html`
- [X] T009 [US1] Persist submitted preferences and recommendation session after successful results in `index.html`

**Checkpoint**: User Story 1 is independently usable as the MVP.

## Phase 4: User Story 2 - Refine Recommendations (Priority: P2)

**Goal**: Allow travelers to revise preferences without restarting the flow.

**Independent Test**: Change one preference from an existing shortlist and
verify unchanged values remain, results update, and the changed preference is
reflected in the displayed reasons.

- [X] T010 [US2] Add optional party-type and interest controls with clear required/optional labeling in `index.html`
- [X] T011 [US2] Implement preference editing and reranking without clearing unchanged values in `index.html`
- [X] T012 [US2] Display changed and relaxed preferences in updated recommendation cards in `index.html`

**Checkpoint**: User Stories 1 and 2 are independently usable.

## Phase 5: User Story 3 - Understand and Continue Planning (Priority: P3)

**Goal**: Show recommendation reasoning and carry the selected destination into
the next planning step.

**Independent Test**: Open a recommendation, verify plain-language match
reasons and caveats, select it, and continue with the selection preserved.

- [X] T013 [US3] Add accessible recommendation detail views with match reasons, caveats, and freshness labels in `index.html`
- [X] T014 [US3] Implement destination selection and selected-session persistence in `index.html`
- [X] T015 [US3] Implement the continue-planning action using the selected destination and active preferences in `index.html`

**Checkpoint**: All planned user stories are independently functional.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate constitutional quality gates and the complete feature.

- [X] T016 Verify keyboard navigation, focus visibility, labels, status announcements, contrast, and non-color cues in `index.html`
- [X] T017 Verify responsive behavior at narrow and wide viewports and remove horizontal overflow in `index.html`
- [X] T018 Run every scenario in `specs/001-personalized-travel-recommendations/quickstart.md` and fix any implementation gaps in `index.html`
- [X] T019 Verify recommendation and feedback timing against SC-001 and SC-002 and document results in `specs/001-personalized-travel-recommendations/quickstart.md`

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001 and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on T002–T005; delivers the MVP.
- **User Story 2 (Phase 4)**: Depends on User Story 1 and T005.
- **User Story 3 (Phase 5)**: Depends on User Story 1 and the session state from T009.
- **Polish (Phase 6)**: Depends on all desired user stories.

### User Story Dependencies

- **US1**: Starts after foundational work; no other story dependency.
- **US2**: Extends the US1 form and ranking flow.
- **US3**: Reuses the US1 session and shortlist state.

### Parallel Opportunities

Because the application is intentionally one file, implementation tasks are
mostly sequential. After T006, T008 can be prepared independently from the
visual result rendering in T007 only if the same-file changes are coordinated.
After all stories, T016 and T017 can be validated in parallel.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T005.
2. Complete T006–T009.
3. Run the US1 independent test and quickstart scenarios 1–2.
4. Stop and demo the shortlist before adding refinement or continuation.

### Incremental Delivery

1. Add US1 and validate the core recommendation loop.
2. Add US2 and validate preference refinement.
3. Add US3 and validate explainability and continuation.
4. Complete the cross-cutting accessibility, responsive, and performance checks.
