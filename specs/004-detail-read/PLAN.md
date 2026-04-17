# 004-detail-read PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `feat`
- Commit scope: `detail`
- Commit subject draft: `add native activity detail route`
- Spec reference: `004-detail-read`
- Plan reference: `specs/004-detail-read/PLAN.md`

## Context

This slice builds on the existing mock-backed catalog. It must turn card browsing into a real mobile loop by adding a dedicated detail screen and a simple external contact seam, while staying out of favorites and auth work.

## Current State

Current repo reality before implementation:

- the shell and visual baseline are complete
- `Explorar` already renders a mock-backed catalog list
- the runtime `CatalogActivity` contract exists in code and is intentionally lean
- no detail route exists yet
- the current web reference still presents detail partly through modal-oriented surfaces that should not be ported literally into native

## Goal

Add the first native detail route so a user can move from catalog card to focused activity context and then out to a simple external contact action.

## In Scope

- add the detail route file under `src/app/(tabs)/explore/`
- extend the catalog seam with detail-by-id reading
- add a detail hook or equivalent route-friendly read path
- add a detail screen with image, summary, facts, location, and contact section
- wire catalog cards to navigate into detail
- add a simple external contact URL helper using the existing phone field

## Out Of Scope

- favorites and toggle actions
- deep linking policy work
- backend calls
- protected routes
- account/profile surfaces
- search and filters

## Assumptions To Avoid

- assuming the web modal should be replicated as-is
- assuming detail needs the full web domain model
- assuming contact requires backend invention
- assuming invalid detail ids can silently fall back to the list without an explicit state

## Touched Files

- `specs/004-detail-read/`: slice spec and plan
- `src/app/(tabs)/explore/_layout.tsx`: register the new detail route in the nested stack
- `src/app/(tabs)/explore/[activityId].tsx`: route entry for the detail screen
- `src/features/catalog/data/`: extend the repository seam for detail reads and contact helpers if needed
- `src/features/catalog/hooks/`: add a detail-focused hook if needed
- `src/features/catalog/components/`: extend card navigation and add detail screen composition
- `docs/`: status, roadmap, architecture, state, debt, and decisions updates once the slice closes

## Risks

- detail could become a disguised modal port instead of a native screen
- contact CTA might overfit to WhatsApp or a web-only pattern
- the list card component could become too coupled to navigation
- invalid ids might produce a confusing blank screen

## Mitigations

- design the detail layout as a full vertical screen with its own back path
- keep contact as a simple external URL built from the existing phone field
- keep card navigation optional and injected from the screen layer
- add explicit loading, error, and not-found states

## Execution Sequence

1. define the detail slice spec and plan
2. extend the catalog seam with detail-by-id reads and contact URL building
3. add the full-screen detail route and UI composition
4. wire catalog cards to the detail route
5. validate the flow and confirm no favorites or auth behavior leaked in
6. update docs and close the slice with a `feat(detail)` commit

## Validation

- ran `npm.cmd run typecheck`
- ran `cmd /c npx expo export --platform web`
- verified the exported routes now include `/explore/[activityId]`
- manually confirmed through the route tree and feature composition that:
  - catalog cards navigate into detail
  - detail renders as a dedicated full-screen route instead of a modal
  - contact opens an external WhatsApp URL when a phone exists
  - missing ids render an honest not-found state

## Definition Of Done

- the catalog routes into a dedicated detail screen
- detail uses the lean catalog contract without dragging in web-only fields
- contact behavior is simple, external, and does not depend on backend invention
- the slice remains free of favorites and auth behavior
- docs reflect that the next target becomes `005-auth-feasibility`

## Outcome

Completed on 2026-04-17.

The repo now supports a native detail route with key facts, location, and a
simple external contact CTA wired from the catalog list.
Closed in git history with `feat(detail): add native activity detail route`.

## Follow-Ups

- implement `005-auth-feasibility` on top of the existing `Cuenta` placeholder
- only expand the catalog contract later if the detail or auth slices prove a real need
