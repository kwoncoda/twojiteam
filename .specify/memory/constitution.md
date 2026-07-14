<!--
Sync Impact Report
- Version change: template → 1.0.0
- Modified principles: five template placeholders → Immediate Feedback,
  Mobile Accessibility, Intuitive Simplicity, Inclusive Accessibility, Fast
  Recommendations
- Added sections: Product Quality Standards; Development Workflow
- Removed sections: none
- Templates requiring updates: ✅ none; plan/spec/tasks templates remain aligned
- Follow-up TODOs: confirm the original ratification date
-->

# my-app Constitution

## Core Principles

### I. Immediate Feedback

The product MUST provide visible feedback immediately after user actions,
including loading, success, empty, validation, and error states. Feedback MUST
identify what happened and, where possible, what the user can do next. This
reduces uncertainty and user stress.

### II. Mobile-First Access

Every user-facing flow MUST be usable on small screens and touch devices
without horizontal scrolling or precision-only interactions. Layouts MUST adapt
to common mobile viewport sizes, and primary actions MUST remain reachable and
legible. This enables access anywhere and at any time.

### III. Intuitive Simplicity

User flows MUST minimize decisions, steps, and visible complexity. Interfaces
MUST use plain labels, consistent interaction patterns, and progressive
disclosure when advanced options are necessary. Each screen MUST have a clear
primary action so users can complete tasks without learning the system first.

### IV. Inclusive Accessibility

The product MUST support keyboard navigation, meaningful focus order,
screen-reader-compatible names and semantics, sufficient color contrast, and
non-color cues for important states. Text and controls MUST remain usable when
text is enlarged. Accessibility acceptance checks MUST cover every new or
changed user flow because diverse users are part of the target audience.

### V. Fast Recommendations

Recommendation features MUST return useful initial results within the product's
defined responsiveness target and MUST expose a usable fallback when data is
missing, stale, or unavailable. Recommendation quality and latency MUST be
measured with representative inputs before release. The system MUST favor a
clear, actionable shortlist over unnecessary choice volume to reduce selection
time.

## Product Quality Standards

New features MUST define measurable acceptance criteria for feedback timing,
mobile usability, accessibility, and recommendation latency when those
concerns apply. User-visible failures MUST be recoverable where possible and
MUST NOT silently discard user input. Changes to recommendation behavior MUST
document the input data, fallback behavior, and evaluation metric.

## Development Workflow

Every feature plan MUST include a Constitution Check covering applicable core
principles. Specifications MUST define independently testable user scenarios
and measurable outcomes. Implementation tasks MUST include validation for
mobile layouts, accessibility, feedback states, and recommendation performance
when relevant. Reviewers MUST reject changes that leave applicable principles
unverified or that introduce unexplained complexity.

## Governance

This constitution supersedes conflicting project practices. Amendments require
a documented rationale, an updated Sync Impact Report, and review of dependent
templates and guidance. Versioning follows semantic versioning: MAJOR for
backward-incompatible governance or principle changes, MINOR for new or
materially expanded principles or sections, and PATCH for clarifications and
non-semantic corrections.

Each feature review MUST verify compliance with applicable principles and record
any justified exception in the plan's Complexity Tracking section. Exceptions
MUST state the affected principle, reason, simpler alternative considered, and
follow-up condition. The constitution owner MUST review it at each release and
after any material product, platform, or accessibility change.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-07-13
