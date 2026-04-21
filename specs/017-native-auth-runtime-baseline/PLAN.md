# 017-native-auth-runtime-baseline PLAN

## Metadata

- Status: Blocked
- Date opened: 2026-04-22
- Last updated: 2026-04-22
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `feat`
- Commit scope: `auth`
- Commit subject draft: `add mobile auth runtime baseline`
- Spec reference: `017-native-auth-runtime-baseline`
- Plan reference: `specs/017-native-auth-runtime-baseline/PLAN.md`

## Context

The catalog is now real, and follow-up slices need a real user session seam.
The mobile repo still lacks any runtime auth state, restore, or sign-out path.

## Current State

- the Supabase client is configured for public anonymous reads only
- no auth session is persisted
- `Cuenta` is a static honest status surface
- the sibling repo already proves the broader backend/auth direction, but mobile
  still needs a narrower first baseline

## Goal

Add a real mobile auth/session provider that supports restore and sign-out,
choose one narrow mobile auth path for the baseline, and turn `Cuenta` into a
live account state surface.

## In Scope

- persistent session storage for mobile
- auth/session provider and hook
- bootstrap and state-change subscription
- narrow sign-in/sign-up surface for the chosen baseline path
- app-profile read when a profile row already exists
- honest account states for anonymous, verification-pending, missing-profile,
  ready, and error conditions

## Out Of Scope

- Google OAuth
- onboarding/profile completion UI
- protected route orchestration
- remote favorites

## Assumptions To Avoid

- assuming “auth runtime baseline” means full web auth parity
- assuming every authenticated user already has a valid app profile
- assuming session restore can work in React Native without an explicit storage
  adapter

## Touched Files

- `package.json` and `package-lock.json`: add the storage dependency needed for
  persisted mobile sessions
- `specs/017-native-auth-runtime-baseline/`: slice spec and plan
- `src/shared/lib/supabase/supabaseClient.ts`: enable auth session persistence
- `src/app/_layout.tsx`: mount the auth provider
- `src/features/account/`: auth runtime model, provider, services, and live
  account screen
- `src/app/(tabs)/account.tsx`: keep the route mounted on the live account
  surface
- `docs/`: status, architecture, roadmap, debt, and decisions updates

## Risks

- auth could sprawl into onboarding/provisioning work
- real signed-in validation may require a prepared account outside the repo

## Mitigations

- limit the baseline to email/password session flow, restore, and sign-out
- read existing app-profile state but do not implement provisioning
- record any validation blocker explicitly in docs instead of faking readiness

## Execution Sequence

1. add persistent session storage to the Supabase client
2. add the auth provider and live account hook
3. connect `Cuenta` to real signed-out/signed-in states
4. read existing `user_profiles` rows when the user is authenticated
5. validate anonymous, stored-session, and sign-out behavior

## Validation

- `npm install`
- `npm run typecheck`
- `cmd /c npx expo export --platform web`
- verify:
  - boot with no session
  - boot with stored session
  - sign-out clears the session state
  - `Cuenta` reflects live state instead of fixed copy

## Definition Of Done

- mobile has a real auth/session baseline
- session restore exists
- sign-out works
- account states remain honest about verification/profile readiness

## Outcome

Blocked on 2026-04-22.

The repo now includes a real mobile auth/session provider with persisted
session storage, live account states, sign-in/sign-up UI for the chosen
email/password baseline, app-profile reads, and sign-out. Static validation
passed, but real closure is blocked by backend readiness: an anonymous
validation sign-up against the shared project returned `Database error saving
new user`, and no verified profile-ready account was available in-repo to prove
the `ready` state end to end.

## Follow-Ups

- resolve the shared backend sign-up failure or validate against a prepared real
  account
- add onboarding/profile completion only in a separate slice
- choose later whether Google OAuth becomes the next auth expansion slice
