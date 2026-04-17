# 002-visual-system PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `feat`
- Commit scope: `ui`
- Commit subject draft: `establish native visual system baseline`
- Spec reference: `002-visual-system`
- Plan reference: `specs/002-visual-system/PLAN.md`

## Context

This slice builds directly on the runnable Expo shell. It exists to replace the shell's screen-local styling with a small shared visual system before catalog and detail screens arrive.

## Current State

Current repo reality before implementation:

- the Expo shell already runs with `Explorar` and `Cuenta`
- the current visual layer is intentionally thin and shell-biased
- typography currently relies on default runtime fonts
- placeholder screens already communicate scope correctly, but they are not yet backed by reusable visual primitives

## Goal

Create a reusable visual baseline for the native POC so later slices can add catalog and detail without rebuilding the look and feel from scratch.

## In Scope

- add a friendly cross-platform font
- expand tokens into a coherent visual baseline
- add shared UI primitives for buttons, cards, labels, and screen framing
- add a shared brand lockup component
- refactor the existing shell screens to use the new primitives

## Out Of Scope

- loading catalog data
- implementing activity cards
- implementing detail routes or CTAs
- introducing auth states beyond the current placeholder screen
- adding a large component library

## Assumptions To Avoid

- assuming the shell's current styling is good enough to build catalog and detail directly
- assuming visual system means a full design system rollout
- assuming the web layout should be translated literally into native sections
- assuming fonts and styling can wait until after catalog work without causing churn

## Touched Files

- `package.json`: added the project font dependency for the visual baseline
- `package-lock.json`: locked the new dependency set
- `src/app/_layout.tsx`: loads the selected font family before the shell renders
- `src/app/+not-found.tsx`: moved the fallback route onto the shared visual layer
- `src/shared/theme/`: expanded tokens and added typography primitives
- `src/shared/ui/`: added reusable text, card, button, brand, and screen framing components
- `src/features/shell/components/`: refactored shell placeholders onto shared building blocks
- `src/app/(tabs)/explore/index.tsx`: consumes the shared visual system

`src/app/(tabs)/account.tsx` did not need direct edits because it already renders through the shared placeholder shell component.

## Risks

- adding too many primitives too early
- making the visual system feel web-like instead of app-like
- coupling the visual system to placeholder content instead of reusable structure

## Mitigations

- limit primitives to what shell, catalog, and detail all plausibly need
- keep layouts vertical, touch-friendly, and compact
- move style responsibility into shared building blocks while keeping screen content separate

## Execution Sequence

1. install the selected font dependency if needed
2. expand the shared theme and add the minimum reusable UI primitives
3. refactor brand and shell presentation onto the shared visual layer
4. verify the shell still builds and that scope has not expanded into catalog or detail behavior
5. update docs and close the slice with a traceable commit

## Validation

- ran `npm.cmd run typecheck`
- ran `cmd /c npx expo export --platform web`
- verified the exported routes still include `/explore` and `/account`
- manually confirmed through the shared shell composition that:
  - `Explorar` and `Cuenta` remain placeholders, not feature screens
  - the shell now uses shared typography, surfaces, pills, buttons, and screen framing
  - no catalog data, detail behavior, or auth behavior leaked into the slice

## Definition Of Done

- shared visual primitives exist and are actually used by the shell
- fonts, tokens, and CTA styling are coherent across tabs
- no catalog, detail, or auth behavior leaked into the slice
- docs reflect the new visual baseline and the next target remains catalog

## Outcome

Completed on 2026-04-17.

The repo now has a thin but reusable native visual baseline built on shared typography, card, button, brand, and screen container primitives.
Closed in git history with `feat(ui): establish native visual system baseline`.

## Follow-Ups

- implement `003-catalog-read` on top of the shared visual system
