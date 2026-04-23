# 019-expo-go-supabase-auth-storage-compat PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-22
- Last updated: 2026-04-22
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `fix`
- Commit scope: `native`
- Commit subject draft: `repair expo go supabase storage compatibility`
- Spec reference: `019-expo-go-supabase-auth-storage-compat`
- Plan reference: `specs/019-expo-go-supabase-auth-storage-compat/PLAN.md`

## Context

Expo Go on SDK 54 is failing before any catalog read occurs because the global
Supabase client initializes auth persistence with an AsyncStorage JS package
that does not match the native module set bundled in Expo Go.

## Current State

- the repo runs on Expo SDK 54
- `@react-native-async-storage/async-storage` is installed at `3.0.2`
- Expo warns that SDK 54 expects `2.2.0`
- `supabaseClient.ts` always configures persistent auth storage on native
- Expo Go throws `AsyncStorageError: Native module is null, cannot access legacy
  storage`
- the crash breaks even the public catalog runtime

## Goal

Make the Supabase runtime compatible with Expo Go again by aligning the storage
dependency and preventing auth-storage startup failures from taking down public
catalog reads.

## In Scope

- install the Expo-compatible AsyncStorage version
- harden Supabase client creation around auth storage availability
- preserve honest runtime errors without fake fallback data
- update docs and status records for the compatibility repair

## Out Of Scope

- new auth flows or UX
- remote favorites expansion
- backend changes
- storage rewrites beyond the immediate compatibility seam

## Assumptions To Avoid

- assuming the catalog query itself is broken
- assuming Expo Go and the current AsyncStorage package are compatible
- assuming the public catalog should depend on auth persistence to boot

## Touched Files

- `specs/019-expo-go-supabase-auth-storage-compat/SPEC.md`
- `specs/019-expo-go-supabase-auth-storage-compat/PLAN.md`
- `package.json`
- `package-lock.json`
- `src/shared/lib/supabase/supabaseClient.ts`
- `docs/PROJECT_STATE.md`
- `docs/FEATURE_STATUS.md`
- `docs/TECH_DEBT.md`
- `docs/DECISIONS_LOG.md`

## Risks

- a version-only repair could still leave the public catalog vulnerable if auth
  storage fails again
- a runtime-only repair without dependency alignment would leave Expo Go outside
  the supported SDK contract

## Mitigations

- apply both dependency alignment and runtime hardening
- keep any auth degradation explicit through the existing auth error surface
- validate import-time client initialization, not just typecheck

## Execution Sequence

1. create the SDD slice and record the failure boundary
2. align AsyncStorage to the Expo SDK 54 expected version
3. harden `supabaseClient.ts` so public reads survive missing auth storage
4. run static and targeted runtime validation
5. update docs and close with a compliant fix commit

## Validation

- `npx expo install @react-native-async-storage/async-storage@2.2.0`
- `npm run typecheck`
- `cmd /c npx expo export --platform web`
- verify:
  - importing the Supabase client no longer throws the observed
    `AsyncStorageError`
  - Expo Go can mount without the auth-storage crash
  - the public catalog no longer fails because auth storage could not start

## Definition Of Done

- Expo Go compatibility is restored for the Supabase runtime
- the public catalog is no longer hostage to AsyncStorage startup failure
- docs reflect the repaired reality and the remaining auth-baseline constraints

## Outcome

Completed on 2026-04-22.

The AsyncStorage dependency is now aligned to Expo SDK 54 at `2.2.0`, and the
Supabase client no longer imports native storage eagerly at module load. On
native runtimes, auth persistence is enabled only when AsyncStorage can be
resolved successfully; otherwise the client falls back to a no-persistence auth
mode instead of crashing the public catalog bootstrap.

## Follow-Ups

- verify the repaired runtime on a physical Expo Go device during the next
  manual smoke pass
- keep `017-native-auth-runtime-baseline` blocked on backend/account readiness,
  not on Expo Go storage compatibility
