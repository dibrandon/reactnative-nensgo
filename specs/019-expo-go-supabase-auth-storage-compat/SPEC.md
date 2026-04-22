# 019-expo-go-supabase-auth-storage-compat SPEC

## Status

Completed on 2026-04-22

## Problem

The mobile repo now has a real Supabase auth/session baseline, but Expo Go on
SDK 54 is crashing before the catalog can load. The observed runtime failure is
`AsyncStorageError: Native module is null, cannot access legacy storage`, which
originates from the global Supabase client initialization path.

## Objective

Restore Expo Go compatibility by aligning the AsyncStorage dependency with the
SDK 54 runtime and hardening Supabase client initialization so missing auth
storage cannot take down the public catalog experience.

## In Scope

- align `@react-native-async-storage/async-storage` to the Expo SDK 54 expected
  version
- harden `src/shared/lib/supabase/supabaseClient.ts` against missing native
  storage
- keep public catalog reads available even if auth persistence cannot start
- document the runtime compatibility rule and resulting repo reality
- create this spec and its plan

## Out Of Scope

- changes to shared backend, schema, or SQL
- auth product expansion beyond the existing baseline
- favorites behavior changes
- catalog contract changes
- Expo SDK upgrade or migration off Expo Go

## Constraints

- no mock or fallback data may be reintroduced
- the fix must stay narrow and runtime-honest
- auth degradation, if needed, must be explicit rather than silent
- the slice must preserve the existing real catalog baseline

## Acceptance Criteria

- Expo Go no longer crashes with the observed AsyncStorage native-module error
- the Supabase client can initialize on Expo Go without taking down public
  catalog reads
- AsyncStorage package version matches Expo SDK 54 expectations
- docs reflect that this slice is a compatibility repair, not new feature scope

## Done Means

This slice is done when the app can mount in Expo Go without the AsyncStorage
compatibility crash and the real public catalog can load again under the
existing honest runtime model.
