# 009-native-explore-search-filters PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `feat`
- Commit scope: `catalog`
- Commit subject draft: `add native search and filter demo flow`
- Spec reference: `009-native-explore-search-filters`
- Plan reference: `specs/009-native-explore-search-filters/PLAN.md`

## Context

The native POC is already runnable on Expo Go and has catalog, detail, and account feasibility surfaces. For tomorrow's demo, the current list is not enough. The repo needs a sharper slice that proves the family discovery loop works natively through search, filters, and preserved context.

## Current State

Current repo reality before implementation:

- the app runs on Expo SDK 54
- `Explorar` renders a mock-backed catalog list with reusable cards
- detail exists as `/explore/[activityId]`
- `Cuenta` remains visible and secondary to the catalog story
- there is no search state, no filters route, and no explore-level shared state yet
- detail back behavior currently uses a hard `router.replace("/explore")`

## Goal

Deliver a demo-ready native explore flow where families can search, filter, and return without losing context, while keeping the rest of the POC narrow.

## In Scope

- create slice `009` spec and plan artifacts
- add shared explore state under the explore stack
- add pure selectors and helpers for search, filter matching, and age normalization
- add `/explore/filters` as a full-screen route
- update `Explorar` to support search, filters, chips, counts, empty state, and clear actions
- align detail back behavior with the same back-or-fallback rule
- update repo docs and close the slice with traceable commits

## Out Of Scope

- changing `Cuenta`
- implementing backend reads
- adding favorites or persistence
- redesigning detail beyond back behavior
- changing the lean `CatalogActivity` contract

## Assumptions To Avoid

- assuming search should count as a filter
- assuming filter options should shrink based on the currently visible result set
- assuming age normalization belongs in the dataset itself
- assuming filters should apply immediately while editing the screen draft
- assuming the demo needs more than `city`, `category`, and `ageBand`

## Touched Files

- `specs/009-native-explore-search-filters/`: slice spec and plan
- `src/app/(tabs)/explore/_layout.tsx`: wrap the explore stack in shared state and register the filters route
- `src/app/(tabs)/explore/filters.tsx`: new filters route entrypoint
- `src/features/catalog/components/`: explore UI updates and filters screen component
- `src/features/catalog/helpers/`: search, filter, age normalization, and back navigation helpers
- `src/features/catalog/hooks/`: shared explore state hook
- `docs/`: roadmap, state, status, decisions, and debt updates at closure

## Risks

- the demo may still feel list-heavy if explore feedback is weak
- back behavior could still feel brittle if fallback rules diverge between filters and detail
- filter semantics may become confusing if search and filters are mixed visually
- mock age labels could create inconsistent filter groupings without normalization

## Mitigations

- promote counts, chips, and clear actions into the first screen view
- centralize the back-or-fallback helper
- keep search presentation separate from filter count
- normalize age in one helper used by options and filter matching

## Execution Sequence

1. open the slice in docs and track it in repo status
2. implement pure search, filter, normalization, and navigation helpers
3. add shared explore state under the explore stack
4. rebuild `Explorar` around the new demo flow
5. add the full-screen filters route and draft behavior
6. update detail back behavior to use the shared helper
7. run validation, update docs, and close the slice with traceable commits

## Validation

- run `npm.cmd run typecheck`
- run `cmd /c npx expo export --platform web`
- smoke test the Android Expo Go flow:
  - search narrows results immediately
  - filters apply only on `Aplicar`
  - back preserves state from detail and filters
  - empty state recovers through `Mostrar todo`

## Definition Of Done

- `Explorar` supports search and filters with preserved state
- `/explore/filters` exists and behaves as a draft screen
- filter count excludes search
- filter options come from the base mock dataset
- detail uses the shared back-or-fallback rule
- docs and git history reflect the new demo slice honestly

## Outcome

Slice opened on 2026-04-18. Implementation is in progress.

## Follow-Ups

- decide after the demo whether the narrow native product should continue toward backend-backed catalog reads
- avoid reopening auth, favorites, or broader product scope unless the demo outcome justifies it
