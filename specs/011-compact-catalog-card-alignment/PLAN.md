# 011-compact-catalog-card-alignment PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `docs`
- Commit scope: `catalog`
- Commit subject draft: `close slice 011 compact card alignment`
- Spec reference: `011-compact-catalog-card-alignment`
- Plan reference: `specs/011-compact-catalog-card-alignment/PLAN.md`

## Context

The user wants the native catalog cards to look closer to the public NensGo reference and to feel denser on a phone. The current runtime already has a working search, filter, and detail loop, so this slice should refine presentation only and avoid reopening catalog behavior.

## Current State

Current repo reality before implementation:

- the app runs on Expo SDK 54 and opens on-device through Expo Go
- `Explorar` already supports search, filters, counts, and detail navigation
- catalog cards are still tall, full-width, and closer to an editorial list than to the compact public browsing card
- the list uses a single-column stack, which limits how many cards are visible at once
- the public NensGo dev reference uses a visibly tighter media ratio and a denser card composition

## Goal

Deliver a compact mobile catalog presentation that feels closer to the public NensGo browse surface and shows roughly four cards across two rows on a typical phone screen.

## In Scope

- create slice `011` spec and plan
- mark the slice in repo status docs
- compact the catalog card presentation in `CatalogActivityCard`
- switch `Explorar` card rendering to a denser grid composition
- keep existing search, filter, detail, and empty-state behavior intact
- update repo docs and close the slice with traceable commits

## Out Of Scope

- changing `CatalogActivity`
- changing search and filters behavior
- changing detail layout
- changing `Cuenta`
- adding new data sources or web-runtime dependencies

## Assumptions To Avoid

- assuming the user wants a pixel-perfect web clone
- assuming card density requires behavior changes or new data
- assuming shared pills or buttons must be globally redesigned to compact the card
- assuming the list should stay single-column just because the earlier slices used it

## Touched Files

- `specs/011-compact-catalog-card-alignment/`: slice spec and plan
- `src/features/catalog/components/CatalogActivityCard.tsx`: compact public-card-inspired layout
- `src/features/catalog/components/CatalogScreen.tsx`: dense grid composition for `Explorar`
- `docs/FEATURE_STATUS.md`: mark the slice as opened and later completed
- `docs/PROJECT_STATE.md`: reflect that a new catalog-presentation slice is active
- `docs/ARCHITECTURE.md`: record the denser card/grid presentation reality once shipped
- `docs/ROADMAP_IMPLEMENTATION.md`: add the new presentation refinement phase
- `docs/DECISIONS_LOG.md`: record the compact-card demo decision

## Risks

- cards may become too small to read if the density push goes too far
- a denser grid may look unstable if card heights vary too much
- changing shared UI primitives globally could create unintended regressions outside the card

## Mitigations

- keep compaction local to the catalog card instead of changing global shared primitives
- keep summary text short and card sections tightly bounded
- use a stable two-column layout rather than mixed card widths

## Execution Sequence

1. open slice `011` in spec, plan, and repo status docs
2. compact the card layout around a tighter media block and lighter metadata rows
3. rebuild the catalog list into a dense mobile grid
4. validate typecheck and export
5. update repo docs, capture the decision, and close the slice with traceable commits

## Validation

- run `npm.cmd run typecheck`
- run `cmd /c npx expo export --platform web`
- visually confirm from the runtime code that:
  - cards render in a two-column grid
  - card media uses a tighter ratio than before
  - the detail navigation remains intact
  - search, filters, counts, and empty states still render

## Definition Of Done

- the catalog card is visibly more compact than the previous version
- `Explorar` shows a denser grid with roughly four cards across two rows on a phone-sized screen
- cards still navigate to detail
- existing explore behavior remains intact
- docs and git history reflect the slice honestly

## Outcome

Not completed yet.

## Follow-Ups

- after the demo, decide whether this denser browse treatment should stay as the default catalog direction
- only reopen deeper card redesign if future product validation requires more than compact scanning density
