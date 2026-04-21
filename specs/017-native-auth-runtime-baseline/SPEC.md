# 017-native-auth-runtime-baseline SPEC

## Status

Blocked on 2026-04-22

## Problem

The mobile app already consumes a real public catalog, but `Cuenta` is still a
static status surface. There is no real session bootstrap, no session restore,
no live auth state, and no sign-out path. That keeps the app honest, but it
blocks every user-linked slice that should come next.

## Objective

Introduce a narrow real mobile auth baseline centered on session runtime,
session restore, sign-out, and an honest account surface, without turning this
slice into the full web auth migration.

## In Scope

- persistent mobile Supabase session runtime
- bootstrap from stored session
- listen to auth state changes
- expose real signed-out and signed-in account states
- expose a narrow auth path chosen for mobile baseline
- sign-out
- read the existing app-user/profile row when it already exists

## Out Of Scope

- Google OAuth
- full onboarding flow
- profile provisioning through `ensure_my_profile(...)`
- profile completion UX
- remote favorites implementation
- analytics
- full parity with the sibling web auth flow

## Constraints

- the slice must stay explicitly narrower than the web migration
- session runtime and sign-out must be real
- any missing verified/profile-ready state must be shown honestly, not faked

## Acceptance Criteria

- the app can bootstrap a persisted session
- the app exposes real signed-out and signed-in runtime states
- `Cuenta` no longer renders fixed baseline copy as if auth were still absent
- sign-out works and clears the visible auth state
- missing or incomplete app-profile state is surfaced honestly

## Done Means

This slice is done when mobile auth exists as a real session baseline with
restore and sign-out, while still stopping short of full onboarding and the full
web auth migration.
