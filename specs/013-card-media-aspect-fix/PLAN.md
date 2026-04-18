# 013-card-media-aspect-fix PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `docs`
- Commit scope: `catalog`
- Commit subject draft: `close slice 013 card media aspect fix`
- Spec reference: `013-card-media-aspect-fix`
- Plan reference: `specs/013-card-media-aspect-fix/PLAN.md`

## Context

After slice `012`, the user still sees cards rendering as stretched image columns in the current preview. The likely cause is that the `4:3` sizing is attached to the image instead of the media container, so the intrinsic image ratio wins in the rendered surface.

## Current State

Current repo reality before implementation:

- the card hierarchy from slice `012` is already in code
- the current media block still places `aspectRatio: 4 / 3` on the `Image`
- the preview screenshot shows the media still stretching and hiding the content block
- the explore grid is two-column, but its alignment is not explicitly hardened against stretch

## Goal

Make the browse card render with a stable `4:3` media container so the content appears immediately below it in the current preview.

## In Scope

- create slice `013` spec and plan
- mark the slice in repo status docs
- fix the media container sizing in `CatalogActivityCard`
- harden the explore grid alignment if needed
- update docs and close the slice with traceable commits

## Out Of Scope

- changing the card hierarchy from slice `012`
- changing the heart toggle behavior
- changing header density again
- changing `Cuenta` or favorites semantics

## Assumptions To Avoid

- assuming the card hierarchy is wrong again when the actual regression is media sizing
- assuming the image itself is the right place for the effective aspect constraint
- assuming the grid can keep default stretch alignment safely in every preview target

## Touched Files

- `specs/013-card-media-aspect-fix/`: slice spec and plan
- `src/features/catalog/components/CatalogActivityCard.tsx`: constrain the media block and make the image fill it correctly
- `src/features/catalog/components/CatalogScreen.tsx`: harden grid alignment if needed
- `docs/FEATURE_STATUS.md`: mark the slice as opened and later completed
- `docs/PROJECT_STATE.md`: reflect the corrected browse rendering once shipped
- `docs/ARCHITECTURE.md`: record the media-container correction
- `docs/ROADMAP_IMPLEMENTATION.md`: add and close the corrective rendering phase
- `docs/DECISIONS_LOG.md`: record the correction decision

## Risks

- changing the media block could accidentally crop images differently than expected
- fixing only the image style could still leave row stretch issues in the grid

## Mitigations

- keep `cover` and accept normal crop as the intended browse behavior
- explicitly set the aspect on the media wrapper and harden grid alignment in the same fix

## Execution Sequence

1. open slice `013` in specs and repo docs
2. fix the media wrapper and image fill behavior
3. harden the grid alignment if needed
4. run validation, update docs, and close the slice with traceable commits

## Validation

- run `npm.cmd run typecheck`
- run `cmd /c npx expo export --platform web`
- confirm from the runtime code that:
  - the media wrapper owns the `4:3` ratio
  - the image fills the wrapper
  - the grid no longer relies on implicit stretch alignment

## Definition Of Done

- the card no longer renders as a stretched image block
- the content becomes visible in the intended card structure
- current browse behavior remains unchanged outside the rendering fix
- docs and git history reflect the slice honestly

## Outcome

Not completed yet.

## Follow-Ups

- only reopen the card hierarchy again if the rendering fix does not resolve the current preview issue
