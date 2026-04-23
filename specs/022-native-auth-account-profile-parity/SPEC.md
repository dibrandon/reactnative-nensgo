# 022-native-auth-account-profile-parity SPEC

## Status

Partial on 2026-04-23

## Problem

The current mobile auth/session seam is real, but it is still intentionally
narrower than `nenkatsu/main`: no Google OAuth, no onboarding completion,
different access-state naming, no protected-intent resume, and a `Cuenta`
screen that still reads like a diagnostic baseline instead of a product
surface.

## Objective

Bring mobile auth, account, and minimum profile-readiness behavior to parity
with the current web frontend wherever that flow is portable to native, without
changing the global background or inventing backend behavior that the shared
contracts do not already support.

## In Scope

- Google OAuth attempt in Expo
- email/password sign-in and sign-up
- verification pending state
- onboarding required state
- profile completion through `ensure_my_profile(...)`
- protected-intent persistence and resume
- product-grade `Cuenta` surface with honest states

## Out Of Scope

- internal-tool permissions
- richer profile editing beyond minimum readiness
- analytics changes
- backend/schema changes

## Constraints

- keep `user_profiles` as the app-user truth
- keep `city_id` as the persistent city truth
- if Google/Auth config blocks live validation, record `Partial`, not `Done`
- the account screen must stop presenting “outside this slice” narration as
  user-facing content

## Acceptance Criteria

- mobile access states align to: `loading`, `anonymous`,
  `verification_pending`, `onboarding_required`, `ready`, `error`
- the user can reach Google or email access from `Cuenta`
- onboarding can create/complete the minimum app profile with city
- protected intents can survive auth/onboarding and resume only once the user
  becomes `ready`
- `Cuenta` looks like product UI, not a feasibility console

## Done Means

This slice is done when mobile auth/account/profile behavior matches the web
frontend's current contract direction and honesty standard, subject to any real
external config blockers being documented explicitly.
