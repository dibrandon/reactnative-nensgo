# 007-native-family-poc PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `docs`
- Commit scope: `poc`
- Commit subject draft: `define native family POC scope and slice 001 prep`
- Spec reference: `007-native-family-poc`
- Plan reference: `specs/007-native-family-poc/PLAN.md`

## Context

The user requested a serious but controlled React Native proof of concept inspired by NensGo. The repo already had SDD and a phased roadmap, but it still needed an umbrella definition of what should actually be validated natively before the first shell slice is implemented.

## Current State

Before this slice, the repository had:

- SDD operating docs
- a generic React Native roadmap
- no runtime application code
- no umbrella spec that translated the current web product into a bounded native POC
- no first executable slice spec or plan

Observed reference product facts from `..\nenkatsu`:

- the current web baseline is family-facing first
- the current web product already includes more than the desired mobile baseline
- detail currently exists through web-specific surfaces, including a modal path
- auth exists as a web seam, but depends on external Supabase configuration

## Goal

Define the mobile POC as a focused family loop and prepare the first executable implementation slice without opening catalog, detail, auth, or data work too early.

## In Scope

- create the umbrella spec and plan for the native family POC
- define the lean mobile contract boundary for future catalog slices
- create the first executable slice spec and plan
- update repo docs so the roadmap and architecture match the approved POC shape
- capture the product interpretation as a durable repo decision

## Out Of Scope

- implementing the Expo scaffold
- creating any runtime files
- adding mock repositories
- creating cards, detail screens, or auth flows
- introducing backend integration
- changing the current commit policy or SDD operating model

## Assumptions To Avoid

- assuming the mobile POC should preserve route parity with the web
- assuming the web data model should be copied into mobile as-is
- assuming the first slice should already include catalog or auth behavior
- assuming a placeholder account surface is equivalent to real auth

## Touched Files

- `docs/ARCHITECTURE.md`: align target architecture with the approved native POC shape
- `docs/ROADMAP_IMPLEMENTATION.md`: tighten phase outputs and exclusions around the focused family loop
- `docs/FEATURE_STATUS.md`: register the umbrella slice and refine later phase notes
- `docs/PROJECT_STATE.md`: reflect that the repo now has an umbrella POC spec and first executable shell plan
- `docs/DECISIONS_LOG.md`: record the native POC interpretation as a durable decision
- `specs/007-native-family-poc/SPEC.md`: define the umbrella POC scope
- `specs/007-native-family-poc/PLAN.md`: record planning and closure of this umbrella-definition slice
- `specs/001-expo-navigation-shell/SPEC.md`: define the first executable implementation slice
- `specs/001-expo-navigation-shell/PLAN.md`: define the execution plan for the shell slice

## Risks

- allowing the umbrella spec to read like a promise of the full product
- bloating the mobile data contract before the catalog slice exists
- smuggling later feature work into slice `001`
- leaving docs inconsistent about whether the next step is shell-only or catalog work

## Mitigations

- define explicit exclusions at the umbrella level
- keep the `CatalogActivity` contract presentation-oriented and lean
- make slice `001` shell-only in both spec and plan
- update architecture, roadmap, feature status, and project state together

## Execution Sequence

1. confirm current repo docs and roadmap state
2. inspect the current web reference in `..\nenkatsu` to avoid inventing the native POC
3. create the umbrella spec and plan
4. create the first executable shell slice spec and plan
5. update repo docs and decisions to align with the approved POC interpretation
6. verify consistency and close this slice with a traceable commit

## Validation

- reviewed existing repo SDD docs before writing the new slice artifacts
- inspected `..\nenkatsu` README, project state, home/catalog/detail/auth source files, and fallback data to ground the POC in the current product reality
- verified the updated docs and specs all treat the native POC as a focused family loop rather than a web migration
- verified that slice `001` remains shell-only and does not include catalog, detail, or auth implementation
- no build, lint, or tests were run because this slice only prepares documentation and the repo still has no runtime app

## Definition Of Done

- the umbrella POC spec and plan exist
- the first executable shell slice spec and plan exist
- core repo docs reflect the approved mobile interpretation
- the lean mobile contract is documented without turning into a full web/domain mirror
- the next implementation task is clearly `001-expo-navigation-shell`

## Outcome

Completed on 2026-04-17.

The repository now has a clear umbrella definition for the native POC and a first executable shell slice prepared for implementation.
Closed in git history with `docs(poc): define native family POC scope and slice 001 prep`.

## Follow-Ups

- implement `001-expo-navigation-shell` exactly as a shell-only slice
- delay catalog data, cards, detail, and auth behavior until their own slices
