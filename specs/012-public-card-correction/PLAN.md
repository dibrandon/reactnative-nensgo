# 012-public-card-correction PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `docs`
- Commit scope: `catalog`
- Commit subject draft: `close slice 012 public card correction`
- Spec reference: `012-public-card-correction`
- Plan reference: `specs/012-public-card-correction/PLAN.md`

## Context

The user attached a native screenshot that shows the current browse cards as vertically stretched and image-heavy, plus a web screenshot that shows the intended hierarchy. The previous slice improved density but did not land the right structure, so this corrective slice must fix the card and tighten the `Explorar` header without reopening broader product scope.

## Current State

Current repo reality before implementation:

- `Explorar` already has search, filters, counts, chips, and detail navigation
- the current card uses a `4:3` image but still gives too much visual weight to the media block
- category is currently overlaid on the image instead of sitting below it in the content block
- the card still lacks the top-right heart shown in the web reference
- there is no real favorites runtime, only static fake favorites in `Cuenta`
- the explore-local provider already persists state across `Explorar`, filters, and detail while the stack stays mounted

## Goal

Correct the browse card hierarchy and compact the `Explorar` header so the native screen feels closer to the supplied web reference while keeping the existing explore flow stable.

## In Scope

- create slice `012` spec and plan
- mark the slice in repo status docs
- extend the existing explore-local state with a local favorite toggle
- rebuild `CatalogActivityCard` around the supplied hierarchy
- tighten the `Explorar` header
- update repo docs and close the slice with traceable commits

## Out Of Scope

- changing `CatalogActivity`
- syncing favorites to `Cuenta`
- persistence across restarts
- backend or auth behavior
- changing filters, search semantics, or empty-state logic

## Assumptions To Avoid

- assuming the previous slice history should be rewritten instead of corrected by a new slice
- assuming the heart implies product-ready favorites
- assuming the card should stay mostly image-first just because the grid remains two-column
- assuming the header needs a full redesign instead of a targeted compaction

## Touched Files

- `specs/012-public-card-correction/`: slice spec and plan
- `src/features/catalog/hooks/useCatalogExplore.tsx`: add session-local favorite toggle state
- `src/features/catalog/components/CatalogActivityCard.tsx`: rebuild the card hierarchy and heart button
- `src/features/catalog/components/CatalogScreen.tsx`: tighten the `Explorar` header and wire favorite state into cards
- `docs/FEATURE_STATUS.md`: mark the slice as opened and later completed
- `docs/PROJECT_STATE.md`: reflect the corrected browse surface once shipped
- `docs/ARCHITECTURE.md`: record the local favorite toggle and corrected browse hierarchy
- `docs/ROADMAP_IMPLEMENTATION.md`: add and close the corrective browse phase
- `docs/DECISIONS_LOG.md`: record the correction decision
- `docs/TECH_DEBT.md`: track the demo-local unsynced favorite toggle if needed

## Risks

- nested heart and card presses could conflict and navigate unexpectedly
- tightening the header too far could hurt readability
- a local favorite toggle could be mistaken for a real persisted feature

## Mitigations

- explicitly stop propagation on the heart press
- keep the header branded and functional while reducing only excess vertical space
- document the favorite toggle as session-local demo state and keep `Cuenta` unchanged

## Execution Sequence

1. open slice `012` in specs and repo docs
2. add local favorite state to the explore provider
3. rebuild the catalog card hierarchy and heart action
4. tighten the `Explorar` header while preserving existing search and filter behavior
5. run validation, update docs, and close the slice with traceable commits

## Validation

- run `npm.cmd run typecheck`
- run `cmd /c npx expo export --platform web`
- manually confirm from the runtime:
  - the first row no longer looks image-stretched
  - heart presses do not open detail
  - card presses still open detail
  - favorite state survives a round-trip into detail while the stack stays mounted
  - the header is visibly shorter

## Definition Of Done

- card hierarchy matches the supplied web reference closely enough for demo use
- the explore header is tighter and surfaces cards earlier
- the heart toggle is local-only and does not leak into `Cuenta`
- search, filters, counts, empty state, and detail flow remain intact
- docs and git history reflect the corrective slice honestly

## Outcome

Not completed yet.

## Follow-Ups

- after the demo, decide whether the local heart should evolve into a real product seam or disappear as a demo affordance
- do not broaden favorites into persistence or account sync without a dedicated follow-up slice
