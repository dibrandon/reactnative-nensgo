# 022-native-auth-account-profile-parity PLAN

## Metadata

- Status: Planned
- Date opened: 2026-04-23
- Last updated: 2026-04-23
- Branch: `feat/native-web-frontend-parity`
- Commit type: `feat`
- Commit scope: `account`
- Commit subject draft: `align mobile auth and account flow with web main`
- Spec reference: `022-native-auth-account-profile-parity`
- Plan reference: `specs/022-native-auth-account-profile-parity/PLAN.md`

## Context

The web repo already treats auth/profile as a real product path with Google,
email/password, verification gating, onboarding-required gating, and
`user_profiles` as app-user truth. Mobile still carries only a smaller baseline.

## Current State

- mobile already has persisted sessions and email/password auth
- mobile reads `user_profiles`
- mobile does not implement `ensure_my_profile(...)`
- mobile does not attempt Google OAuth
- mobile does not persist or resume protected intents
- `Cuenta` still exposes diagnostic slice language

## Goal

Lift mobile auth/account/profile to the same functional product direction as
the web frontend, adapted to native routing and controls.

## In Scope

- auth/session hook expansion
- onboarding completion UI and city choice loading
- Google OAuth attempt for Expo
- product-grade account screen
- protected-intent persistence and resume

## Out Of Scope

- internal routes or permissions
- richer profile editing
- account linking/change-email flows

## Assumptions To Avoid

- assuming Google can be declared done without a real config check
- assuming every authenticated account already has a ready profile
- assuming `profile_missing` is still the right public state label

## Touched Files

- `specs/022-native-auth-account-profile-parity/`: slice spec and plan
- `src/features/account/data/`: profile and onboarding services
- `src/features/account/hooks/useAuthSession.tsx`: state machine and auth API
- `src/features/account/components/`: account/onboarding UI
- `src/app/(tabs)/account*`: routing surface changes
- `src/shared/lib/supabase/supabaseClient.ts`: auth redirects/providers if
  needed for Expo
- `docs/`: status, roadmap, state, debt, and decisions updates

## Risks

- Expo Google OAuth may require environment configuration not verifiable in-repo
- protected-intent work could leak into favorites behavior before `023`
- onboarding could accidentally drift into rich profile editing

## Mitigations

- keep Google validation honest and explicit
- scope protected intents to the three concrete parity cases
- keep onboarding minimal: name, last name, city

## Execution Sequence

1. expand auth/profile services and state machine
2. add minimum onboarding completion and city choices
3. add Google OAuth attempt for Expo
4. replace the diagnostic account UI with the parity surface
5. persist and resume protected intents through ready-state completion

## Validation

- `npm run typecheck`
- `npx expo export --platform web`
- `git diff --check`
- manual checks for:
  - anonymous
  - verification pending
  - onboarding required
  - ready
  - error
  - Google attempt
  - email/password flows

## Definition Of Done

- access-state model matches the web direction
- onboarding completion exists
- account surface is product-grade
- protected intents can resume after access becomes ready
- blockers remain documented honestly

## Outcome

Not shipped yet.

## Follow-Ups

- validate Google end to end against the shared Supabase redirect config
- keep richer profile editing for a later slice if the web product evolves
