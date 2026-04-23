# 021-native-public-catalog-detail-parity PLAN

## Metadata

- Status: Partial
- Date opened: 2026-04-23
- Last updated: 2026-04-23
- Branch: `feat/native-web-frontend-parity`
- Commit type: `feat`
- Commit scope: `catalog`
- Commit subject draft: `align public mobile catalog and detail with web main`
- Spec reference: `021-native-public-catalog-detail-parity`
- Plan reference: `specs/021-native-public-catalog-detail-parity/PLAN.md`

## Context

`nenkatsu/main` already defines the current public product behavior for teaser
cards, detail structure, contact behavior, and public-surface hardening.
Mobile already uses the same backend direction, but not the same functional UI
rules.

## Current State

- cards and detail already use real catalog data
- image URL hardening already exists
- detail already uses `activity_contact_options`
- public copy in Explore, Filters, detail, and state panels still contains
  meta/process wording
- detail still prefers `description || shortDescription`

## Goal

Close the public-runtime parity gap without changing the global background or
blindly porting web layout conventions.

## In Scope

- card rule alignment
- detail helper alignment
- public hardening copy cleanup
- detail-core refactor usable by explore and future favorites detail
- explicit `0/1/>1` contact states kept honest

## Out Of Scope

- favorites list runtime
- profile/onboarding
- internal/web-only surfaces

## Assumptions To Avoid

- assuming the current card/detail copy is already parity-safe
- assuming mobile should show every visible label from the web modal
- assuming current backend data is enough to close `>1 contactos`

## Touched Files

- `specs/021-native-public-catalog-detail-parity/`: slice spec and plan
- `src/features/catalog/models/`: contract additions if needed for parity rules
- `src/features/catalog/data/`: mapper/helper alignment
- `src/features/catalog/helpers/`: detail and state logic
- `src/features/catalog/components/`: cards, detail, filters, state panels
- `src/app/(tabs)/explore/`: routed explore/detail wrappers if needed
- `docs/`: status, state, roadmap, debt, and decisions updates

## Risks

- detail refactor could sprawl into favorites implementation early
- public copy cleanup could accidentally change behavior instead of wording
- missing real `>1` contact data could block full closure again

## Mitigations

- keep favorites route work explicitly for `023`
- refactor only toward a shared detail core, not a broad navigation rewrite
- close the slice as partial if the data coverage still blocks full contact
  validation

## Execution Sequence

1. align card and mapper rules with the current web frontend
2. refactor detail into a reusable core with routed wrappers
3. clean public copy in cards/detail/filters/state panels
4. re-validate contact states and record any remaining backend blocker

## Validation

- `npm run typecheck`
- `npx expo export --platform web`
- `git diff --check`
- manual check for:
  - public catalog load
  - placeholder/media rules
  - detail layout and hidden empty blocks
  - `0`, `1`, and `>1` contact states where data allows

## Definition Of Done

- public catalog/detail follow the web main frontend rules where portable
- public copy is hardened
- background remains unchanged
- remaining contact-data blockers are documented honestly

## Outcome

Implemented in code on 2026-04-23.

- public cards now follow the current web-facing fallback and visibility rules
- detail now uses a shared native detail core with `shortDescription` as the
  primary descriptive block
- Explore/detail favorite taps now flow through protected intents instead of a
  dead-end account redirect
- public-state copy no longer carries the former meta/process language
- real closure still depends on backend data that proves `1` and `>1` active
  contact-option states in manual runtime validation

## Follow-Ups

- connect protected favorite intents once `022` and `023` land
- close the remaining contact-data validation if the shared backend still lacks
  a real multi-option activity
