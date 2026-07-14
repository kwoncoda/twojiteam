# Research: Personalized Travel Recommendations

## Decision: Single self-contained HTML page

**Rationale**: The requested scope is a lightweight browser application with no
server or build step. One file is directly runnable and keeps deployment simple.

**Alternatives considered**: A framework or separate frontend files would add
build and dependency overhead without solving a stated requirement.

## Decision: Browser-native JavaScript and localStorage

**Rationale**: Native APIs satisfy local persistence without dependencies.
Store only the active preference set, current shortlist, selected destination,
and catalog version. Validate parsed values before use and fall back to an
in-memory session if storage is blocked or full.

**Alternatives considered**: IndexedDB is unnecessary for the small catalog and
single traveler scope; a server database is outside the requested offline,
single-page boundary.

## Decision: Deterministic local ranking

**Rationale**: A small bundled catalog can be ranked immediately using budget,
departure period, duration, and optional refiners. Deterministic scoring makes
the recommendation reason explainable and easy to validate.

**Alternatives considered**: Remote or machine-learning recommendations would
require a service, introduce failure and latency dependencies, and exceed the
current scope.

## Decision: Progressive responsive interface

**Rationale**: Native form controls, CSS media queries, semantic landmarks,
visible focus, and a live status region cover the mobile and accessibility
requirements without a UI library.

**Alternatives considered**: A component library adds dependencies and does not
improve the core requirement for a single HTML file.
