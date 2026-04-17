# 003-catalog-read PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `feat`
- Commit scope: `catalog`
- Commit subject draft: `add mock-backed mobile catalog list`
- Spec reference: `003-catalog-read`
- Plan reference: `specs/003-catalog-read/PLAN.md`

## Context

This slice is the first feature implementation under the native POC. It turns `Explorar` from a shell placeholder into a real catalog read surface without opening detail, filters, favorites, or auth work ahead of schedule.

## Current State

Current repo reality before implementation:

- the Expo shell and tabs already run
- the shared visual baseline is in place
- `Explorar` is still a placeholder screen
- there is no runtime catalog feature module yet
- the current web reference in `..\nenkatsu` already has fallback catalog data that can be adapted into a leaner mobile shape

## Goal

Create the first native catalog read experience with curated mock data and mobile-ready cards, while keeping the data boundary small and leaving detail behavior to slice `004`.

## In Scope

- define the lean `CatalogActivity` model in code
- adapt a curated set of active activities from the current web fallback into mobile mocks
- add a repository seam and hook for catalog reads
- add mobile catalog screen composition for loading, error, empty, and populated states
- add a reusable activity card component without detail navigation
- copy only the catalog images needed by the curated mock set into the repo if they improve the POC materially

## Out Of Scope

- detail route files or navigation actions
- external contact CTA wiring
- favorites and persistence
- search, city filters, category chips, or toolbar parity with the web
- Supabase or any remote backend
- account or auth work

## Assumptions To Avoid

- assuming the mobile catalog should mirror the full web fallback entities
- assuming the list needs filters before it can validate the family discovery loop
- assuming detail navigation must be added in the same slice as the list
- assuming mock data can live inline in the route component without harming continuity

## Touched Files

- `specs/003-catalog-read/`: slice spec and plan
- `src/features/catalog/models/`: lean runtime catalog contract
- `src/features/catalog/data/`: curated mocks, image mapping, and repository seam
- `src/features/catalog/hooks/`: catalog read hook
- `src/features/catalog/components/`: catalog screen, state panels, and activity card
- `src/app/(tabs)/explore/index.tsx`: replace shell placeholder with the catalog screen
- `assets/images/catalog/`: only the curated image assets needed by the mock set
- `docs/`: status, roadmap, architecture, state, debt, and decisions updates once the slice closes

## Risks

- the catalog contract may start drifting toward the web domain model
- the list may become a disguised detail screen if cards carry too much information
- copying too many assets could bloat the repo without adding meaningful POC value
- loading and empty states may be skipped because mocks are available immediately

## Mitigations

- define and enforce the lean `CatalogActivity` boundary first
- keep cards focused on scanability: category, title, short description, age, center, city, and free badge
- copy only the images used by the curated activity set
- implement state panels through the hook even if mocks resolve locally

## Execution Sequence

1. define the `CatalogActivity` runtime model and curated mock data set
2. add the mock repository seam and hook
3. add the reusable mobile activity card and catalog screen composition
4. replace the `Explorar` placeholder with the catalog screen
5. validate the runtime and confirm no detail, filters, favorites, or auth behavior leaked in
6. update docs and close the slice with a `feat(catalog)` commit

## Validation

- ran `npm.cmd run typecheck`
- ran `cmd /c npx expo export --platform web`
- verified the exported routes still do not include a detail screen yet
- manually confirmed through the rendered route tree and feature composition that:
  - `Explorar` now renders a mock-backed catalog list
  - the list reads through a catalog seam instead of route-local literals
  - the runtime `CatalogActivity` contract stays lean and presentation-oriented
  - the cards do not include detail or contact behavior yet
  - the `Cuenta` tab remains unchanged

## Definition Of Done

- `Explorar` shows a real catalog list with reusable cards
- catalog reads flow through a mock-backed seam rather than route-local literals
- the mobile catalog contract remains lean and presentation-oriented
- the slice stops before detail navigation and contact CTA behavior
- docs reflect that the next target is `004-detail-read`

## Outcome

Completed on 2026-04-17.

The repo now contains a first native catalog read path with curated mobile mocks,
shared cards, and a dedicated catalog feature module.
Closed in git history with `feat(catalog): add mock-backed mobile catalog list`.

## Follow-Ups

- implement `004-detail-read` with a dedicated full-screen route
- keep any future contract expansion justified by detail needs, not copied from the web by default
