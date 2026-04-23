# 021-native-public-catalog-detail-parity SPEC

## Status

Planned on 2026-04-23

## Problem

The mobile app already uses the shared real catalog and real activity contact
boundary, but the public runtime still diverges from `nenkatsu/main` in card
rules, detail content rules, public-surface copy hardening, and favorites
gating behavior around the teaser/detail surfaces.

## Objective

Bring the public mobile catalog and detail flow to functional parity with the
current web frontend wherever that behavior is portable and reasonable in a
native app, while preserving the current RN background and route-native detail
surface.

## In Scope

- public catalog cards
- media/fallback rules
- detail presentation contract
- detail state panels and public copy hardening
- contact CTA states around `activity_contact_options`
- protected favorite interaction entry points in public catalog/detail

## Out Of Scope

- Google OAuth implementation
- onboarding/profile completion
- favorites list tab and favorites detail route
- backend data seeding

## Constraints

- keep the current RN global background unchanged
- do not reintroduce `contactPhone`, center-level fallback, or hardcoded
  WhatsApp
- keep `activity_contact_options` as the only contact source
- use `shortDescription` as the primary public descriptive block when present
- do not port the web modal structure literally; keep a native routed detail

## Acceptance Criteria

- card rendering follows the current web fallback and visibility rules
- detail hides empty optional blocks and respects the shared ordering rules
- public copy no longer reads like diagnostics or implementation narration
- heart taps in public catalog/detail no longer dump the user straight into a
  dead-end account screen; they must flow through the protected-intent system
  once that exists
- contact remains honest for `0`, `1`, and `>1` options

## Done Means

This slice is done when the public mobile catalog and detail runtime reflect
the web product's current frontend rules and honesty standard without changing
the RN background or porting web-only layout mechanics.
