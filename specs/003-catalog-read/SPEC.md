# 003-catalog-read SPEC

## Status

Completed on 2026-04-17

## Problem

The native shell now has enough structure and visual consistency to host real content, but `Explorar` is still a placeholder. The POC cannot evaluate whether NensGo's family-facing discovery loop works on mobile until the app shows an actual catalog surface with mobile-ready cards and honest mock data.

## Objective

Implement the first readable mobile catalog for the native POC using a lean `CatalogActivity` contract, mock-backed data adapted from the current web fallback, and reusable mobile cards.

## In Scope

- define the runtime `CatalogActivity` model in code using the lean mobile boundary
- add curated mock catalog data adapted from the current web fallback
- add a mock-backed repository or data access seam for catalog reads
- add a catalog hook with loading, error, and empty handling
- replace the `Explorar` placeholder with a real catalog list screen
- add reusable mobile catalog cards sized for the future detail slice

## Out Of Scope

- detail route implementation
- contact CTA behavior
- favorites
- complex filters, search, or sorting controls
- remote API integration
- auth-protected actions

## Constraints

- keep the mobile contract presentation-oriented and intentionally small
- do not mirror the full web fallback entities or raw fields into runtime code
- only adapt the fields needed for card, basic detail, and simple contact CTA
- keep the detail seam available for the next slice without implementing it here
- the list must stay honest about using mock data

## Acceptance Criteria

- `Explorar` renders a catalog list instead of a placeholder shell card
- the catalog reads from a mock-backed seam rather than hardcoding card content in the screen
- the runtime `CatalogActivity` shape stays lean and avoids raw web-only fields
- the catalog includes at least one free activity and multiple categories or cities
- no detail navigation, favorites, filters, or auth behavior appears in this slice

## Done Means

This slice is done when the app can demonstrate a believable native catalog browsing surface with mock-backed cards and a clear path into a later detail slice, without pretending the rest of the product already exists.
