# 020-native-web-parity-audit PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-23
- Last updated: 2026-04-23
- Branch: `feat/native-web-frontend-parity`
- Commit type: `docs`
- Commit scope: `parity`
- Commit subject draft: `document mobile parity program against web main`
- Spec reference: `020-native-web-parity-audit`
- Plan reference: `specs/020-native-web-parity-audit/PLAN.md`

## Context

The RN repo no longer matches its own strategic documentation. The runtime had
already moved toward real shared contracts, while the docs still framed mobile
as intentionally narrower than the current web frontend. The user explicitly
requested a parity audit first, using `nenkatsu/main` as the source of truth.

## Current State

- `reactnative-nensgo` already has real catalog, contact, auth-session, and
  remote-favorites seams
- the master docs still describe web parity as outside the POC baseline
- blocked slices `016`-`018` exist, but no parity program ties them to the
  current web baseline
- no traced slice exists yet for the parity audit itself

## Goal

Open the parity program formally, align the master docs to the new source of
truth, and create the next execution slices before runtime work starts.

## In Scope

- `020` spec and plan
- new `021`, `022`, and `023` slice artifacts
- parity-oriented updates to:
  - `docs/PROJECT_STATE.md`
  - `docs/ARCHITECTURE.md`
  - `docs/FEATURE_STATUS.md`
  - `docs/ROADMAP_IMPLEMENTATION.md`
  - `docs/TECH_DEBT.md`
  - `docs/DECISIONS_LOG.md`

## Out Of Scope

- runtime implementation
- backend changes
- edits outside `reactnative-nensgo`

## Assumptions To Avoid

- assuming web parity means porting every route in the web app
- assuming the older POC framing still reflects the intended direction
- assuming blocked slices `016`-`018` can be silently replaced instead of
  preserved as historical truth

## Touched Files

- `specs/020-native-web-parity-audit/`: parity-audit slice
- `specs/021-native-public-catalog-detail-parity/`: execution slice opening
- `specs/022-native-auth-account-profile-parity/`: execution slice opening
- `specs/023-native-favorites-surface-parity/`: execution slice opening
- `docs/PROJECT_STATE.md`: current reality and next-action framing
- `docs/ARCHITECTURE.md`: parity-driven architecture direction and exclusions
- `docs/FEATURE_STATUS.md`: open/closed slice registry for the parity pass
- `docs/ROADMAP_IMPLEMENTATION.md`: active sequencing
- `docs/TECH_DEBT.md`: parity-specific structural debt and blockers
- `docs/DECISIONS_LOG.md`: durable parity source-of-truth decision

## Risks

- docs could overstate mobile parity before runtime changes land
- old POC language could remain in conflicting sections
- parity could be misread as permission to port web-only surfaces

## Mitigations

- keep current state and target state separated explicitly
- document exclusions in the audit slice and master docs
- open concrete follow-up slices instead of collapsing everything into one blob

## Execution Sequence

1. record the audit slice and parity matrix intent
2. open `021`, `022`, and `023` as concrete next slices
3. align master docs to the new parity program and exclusions
4. record the source-of-truth decision and background exception durably

## Validation

- manual doc consistency check across the touched files
- `git diff --check`

## Definition Of Done

- parity direction is visible in repo docs
- follow-up slices are open and executable
- exclusions and background guardrail are explicit

## Outcome

Completed on 2026-04-23.

The RN repo now has a parity-audit slice that formally adopts
`nenkatsu/main` as the frontend source of truth for mobile-portable surfaces,
opens three traced implementation slices, and updates the master docs so the
roadmap no longer claims that web parity is outside the repo's active
direction.

## Follow-Ups

- implement `021-native-public-catalog-detail-parity`
- implement `022-native-auth-account-profile-parity`
- implement `023-native-favorites-surface-parity`
