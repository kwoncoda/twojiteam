# Data Model: Personalized Travel Recommendations

## TravelerPreferences

Stored key: `travel.preferences`

| Field | Type | Required | Validation |
|---|---|---:|---|
| budget | positive number | Yes | Greater than zero |
| departurePeriod | `YYYY-MM` string | Yes | Valid month value |
| durationDays | positive integer | Yes | At least 1 |
| partyType | short string | No | One supported option |
| interests | string array | No | Supported catalog tags only |

## Destination

Bundled catalog entity; optionally persisted with a catalog version.

| Field | Type | Validation |
|---|---|---|
| id | unique string | Required and stable |
| name | string | Required |
| country | string | Required |
| seasonMonths | integer array | Contains 1–12 |
| typicalBudget | positive number | Greater than zero |
| minDurationDays | positive integer | At least 1 |
| maxDurationDays | positive integer | Not less than minimum |
| partyTypes | string array | Supported options |
| interests | string array | Supported catalog tags |
| summary | string | Required |
| freshnessLabel | string | Required for display |

## DestinationRecommendation

Derived for each request and rendered in descending score order.

| Field | Type | Description |
|---|---|---|
| destinationId | string | References `Destination.id` |
| score | number | Deterministic match score |
| matchReasons | string array | Plain-language reasons shown to the traveler |
| relaxedPreferences | string array | Constraints not fully matched |
| freshnessLabel | string | Copied from the destination |

## RecommendationSession

Stored key: `travel.session`

| Field | Type | Description |
|---|---|---|
| preferences | TravelerPreferences | Last submitted preferences |
| recommendations | DestinationRecommendation array | Current shortlist |
| selectedDestinationId | string or null | Current selection |
| updatedAt | ISO date-time string | Last successful update |
| catalogVersion | string | Prevents stale catalog assumptions |

## State Transitions

`empty → editing → loading → results | empty-state | error`

`results → editing` preserves unchanged preferences. Selecting a result sets
`selectedDestinationId`; continuing carries the session into the next planning
step. A storage failure changes persistence behavior to in-memory only and
surfaces a non-blocking notice.
