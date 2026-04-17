# 008-expo-go-sdk-54-compat PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `build`
- Commit scope: `expo`
- Commit subject draft: `downgrade Expo runtime to sdk 54`
- Spec reference: `008-expo-go-sdk-54-compat`
- Plan reference: `specs/008-expo-go-sdk-54-compat/PLAN.md`

## Context

The native POC is complete, but the user cannot currently run it on a physical phone with the default Expo Go app because the project was scaffolded on SDK 55 during a rollout window where Expo Go in stores still defaults to SDK 54.

## Current State

Current repo reality before implementation:

- the app currently uses Expo SDK 55
- the repo is otherwise stable, committed, and clean
- the POC runtime already includes shell, catalog, detail, and account feasibility surfaces
- official Expo guidance for the current transition window states that Expo Go in stores remains on SDK 54 for a short period and SDK 55 Expo Go is not yet the default store build

## Goal

Bring the repo down to Expo SDK 54 so the existing POC can be opened from Expo Go on the user's phone without changing the app's functional scope.

## In Scope

- create this compatibility slice
- change Expo runtime packages to SDK 54-compatible versions
- run `expo install --fix` to align the dependency set
- run validation after the downgrade
- update docs that still claim SDK 55

## Out Of Scope

- switching the repo to a dev build workflow
- changing feature behavior
- broad refactors unrelated to Expo SDK compatibility

## Assumptions To Avoid

- assuming only the `expo` package version matters
- assuming SDK 55 store support is already present for the user's Expo Go build
- assuming docs can keep claiming SDK 55 after the downgrade
- assuming a downgrade should silently change app features

## Touched Files

- `specs/008-expo-go-sdk-54-compat/`: new compatibility slice spec and plan
- `package.json`: downgrade Expo and aligned runtime dependencies
- `package-lock.json`: lock the SDK 54-compatible dependency set
- `app.json`: reflect any config plugin adjustments introduced by the SDK 54 alignment
- `docs/PROJECT_STATE.md`: reflect the new runtime baseline
- `docs/ARCHITECTURE.md`: update implemented runtime version
- `docs/FEATURE_STATUS.md`: register this compatibility slice
- `docs/TECH_DEBT.md`: record any remaining tradeoff created by staying on SDK 54
- `docs/DECISIONS_LOG.md`: record the compatibility decision if the downgrade lands

## Risks

- partial downgrade leaving mismatched Expo and React Native versions
- a transitive package may require a small config adjustment
- docs may drift and still report SDK 55

## Mitigations

- use Expo's documented downgrade flow
- run `expo install --fix` and `expo-doctor`
- update top-level state and architecture docs in the same slice

## Execution Sequence

1. create the compatibility slice spec and plan
2. downgrade the Expo runtime to SDK 54 with the official workflow
3. align package versions and inspect for required config changes
4. validate with typecheck, Expo export, and Expo doctor
5. update docs and close the slice with a `build(expo)` commit

## Validation

- ran `cmd /c npx expo install --check`
- ran `npm.cmd run typecheck`
- ran `cmd /c npx expo export --platform web`
- ran `cmd /c npx expo-doctor`
- manually inspected `package.json` to confirm SDK 54-aligned versions

## Definition Of Done

- the repo is on Expo SDK 54-compatible package versions
- validation passes after the downgrade
- docs reflect SDK 54 as the current runtime baseline
- the slice is committed with traceable history

## Outcome

Completed on 2026-04-18.

The repo now runs on Expo SDK 54-compatible packages so it can be opened from
the default Expo Go store build during the current compatibility window.
`app.json` now also includes the `expo-font` and `expo-web-browser` config plugins
that Expo added while aligning the SDK 54 dependency set.
Closed in git history with `build(expo): downgrade Expo runtime to sdk 54`.

## Follow-Ups

- once Expo Go store support for newer SDKs stabilizes, decide whether upgrading again is worth the churn
- if the app moves beyond Expo Go convenience, consider development builds instead of pinning the repo to store timing
