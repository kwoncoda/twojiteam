# Quickstart: Personalized Travel Recommendations

## Prerequisites

- A current desktop or mobile browser.
- The repository's `index.html` opened directly or served from a simple local
  static server.
- JavaScript and browser storage enabled.

## Run

1. Open `index.html` in the browser.
2. Enter a positive budget, departure month, and trip duration.
3. Submit the form and confirm that a progress message appears immediately.
4. Confirm that a ranked shortlist appears with destination details and match
   reasons.

## Validation scenarios

1. **Required input**: Submit with one required field empty. An accessible
   validation message identifies the field and no recommendation is generated.
2. **Recommendation**: Submit valid values. Results appear within 5 seconds,
   show ranking reasons, and are saved in `localStorage`.
3. **Refinement**: Change the budget or duration. The shortlist updates without
   re-entering unchanged values.
4. **No exact match**: Use an unusually low budget or incompatible duration.
   Near matches appear with the relaxed preference labeled.
5. **Persistence**: Reload the page. The last preferences and session restore;
   clearing the relevant storage key returns the empty state.
6. **Storage fallback**: Block browser storage or fill it to capacity. The app
   remains usable in memory and shows a non-blocking persistence notice.
7. **Mobile**: Test a narrow viewport. No horizontal scrolling or clipped
   controls appear, and primary actions remain reachable.
8. **Accessibility**: Complete the flow using only the keyboard. Verify focus
   visibility, logical order, labels, status announcements, and non-color
   error/success cues with an accessibility checker.

## Expected outcome

All scenarios complete without console errors, data loss, inaccessible controls,
or stale destination details presented as current facts.
