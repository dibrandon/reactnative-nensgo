# 016-native-detail-real-contact-options PLAN

## Metadata

- Status: Blocked
- Date opened: 2026-04-22
- Last updated: 2026-04-22
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `feat`
- Commit scope: `detail`
- Commit subject draft: `wire real activity contact options into mobile detail`
- Spec reference: `016-native-detail-real-contact-options`
- Plan reference: `specs/016-native-detail-real-contact-options/PLAN.md`

## Context

The real mobile detail flow is now honest but incomplete. The sibling web repo
already moved the contact boundary to `activity_contact_options`, and mobile
needs to inherit that decision instead of keeping a disabled placeholder
indefinitely.

## Current State

- the detail screen renders real activity data
- the contact card is a static informational placeholder
- the shared backend currently exposes `activity_contact_options`
- the checked shared data currently validates only the `0 contactos` state

## Goal

Replace the placeholder with the real contact-options runtime without inventing
fallback behavior and without claiming closure before the backend exposes all
required validation cases.

## In Scope

- contact option model, repository, hook, and action helper
- detail card states for loading, error, zero options, one option, multiple
  options
- chooser surface for multiple options

## Out Of Scope

- app-user analytics writes
- center-level contact fallback
- auth-protected contact gating
- backend data seeding

## Assumptions To Avoid

- assuming “wired like web” equals fully validated
- assuming a zero-contact result means the query failed
- assuming mobile should reopen the old `contactPhone` contract

## Touched Files

- `specs/016-native-detail-real-contact-options/`: slice spec and plan
- `src/features/catalog/models/`: contact-option boundary
- `src/features/catalog/data/`: contact-options repository and action helpers
- `src/features/catalog/hooks/`: detail contact-options hook
- `src/features/catalog/components/CatalogActivityDetailScreen.tsx`: live
  contact state and chooser surface
- `docs/`: updates after implementation/validation status is known

## Risks

- the shared dataset may still expose only the zero-contact case
- opening contact actions may fail on device if a URL scheme is malformed

## Mitigations

- keep the zero-contact state explicit and honest
- validate and normalize action URLs before opening them
- mark the slice blocked instead of closed if `1` and `>1` remain untestable in
  real data

## Execution Sequence

1. mirror the sibling repo contact boundary and filter rule
2. add mobile URL/action helpers for supported contact methods
3. replace the placeholder card with live states
4. validate zero-contact against the shared backend
5. close or block the slice based on real-data coverage

## Validation

- query `activity_contact_options` in the shared backend
- verify mobile detail behavior for:
  - `0` options
  - `1` option
  - `>1` options
- `npm run typecheck`
- `cmd /c npx expo export --platform web`

## Definition Of Done

- all three contact states are implemented
- all three states are validated with real data
- docs describe the actual validation coverage honestly

## Outcome

Blocked on 2026-04-22.

The mobile detail runtime now reads `activity_contact_options`, supports the
zero-option disabled state, supports a direct-action path for one option, and a
chooser surface for multiple options. However, the checked shared backend still
returns `0` active rows across the current visible catalog, so only the
zero-contact state could be validated with real data. The slice stays blocked
until the shared dataset exposes real `1` and `>1` option cases.

## Follow-Ups

- validate the direct-action path against a real activity with exactly `1`
  active option
- validate the chooser path against a real activity with `>1` active options
