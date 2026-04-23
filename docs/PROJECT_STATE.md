# Project State

## Snapshot

Last updated: 2026-04-22

- Current branch: `feat/native-real-catalog-no-mocks`
- Git history: initialized with traceable SDD baseline commits
- Git remotes: `origin` configured
- Application code: Expo Router shell, Supabase-backed public catalog with
  search and filters, hardened real catalog media, full-screen detail route
  wired to real contact-options states, a live mobile auth/session baseline,
  and remote favorites logic gated behind real account readiness
- Build tooling: Expo SDK 54
- Package manager choice: npm
- Mobile stack in code: Expo Router + TypeScript
- CI or quality gates: absent
- Backend or API contract: shared Supabase view `catalog_activities_read`,
  shared table `activity_contact_options`, and shared auth/favorites tables used
  through honest mobile seams

## What Existed Before This Bootstrap Task

Before this task, the repository contained only `.git`.

There was no:

- React Native or Expo scaffold
- `package.json`
- `tsconfig.json`
- navigation setup
- UI system
- feature code
- project documentation
- spec or plan structure

## What Exists Now

The repository now has the following operating baseline:

- repo-level agent instructions
- plan template
- project docs index and state docs
- commit policy for closing slices
- native POC umbrella spec and first executable shell plan
- runnable Expo shell with `Explorar` and `Cuenta`
- `src/app` router structure and shared visual baseline
- a mobile Supabase client for public catalog reads under `src/shared/lib/supabase`
- real catalog reads through `catalog_activities_read` under `src/features/catalog`
- hardened catalog image normalization against the shared Supabase `activities`
  storage bucket
- full-screen detail route under `src/app/(tabs)/explore/[activityId].tsx`
- live contact-option reads for detail under `src/features/catalog`
- an account feature module with a live auth/session baseline surface
- a remote favorites provider under `src/features/favorites`
- a completed Expo Go Supabase storage compatibility repair under
  `specs/019-expo-go-supabase-auth-storage-compat/`
- final POC evaluation artifact under `docs/POC_EVALUATION.md`
- Expo Go compatibility slice that pins the current runtime to SDK 54
- a completed demo slice for native catalog search and filters under `specs/009-native-explore-search-filters/`
- a completed real-catalog baseline slice under `specs/014-native-real-catalog-no-mocks/`
- a completed image-hardening slice under
  `specs/015-native-catalog-image-url-hardening/`
- blocked follow-up slices for real contact, auth runtime validation, and
  remote favorites under:
  - `specs/016-native-detail-real-contact-options/`
  - `specs/017-native-auth-runtime-baseline/`
  - `specs/018-native-remote-favorites/`
- phased roadmap
- feature registry
- tech debt tracker
- decisions log
- first spec and first plan for bootstrap
- initial git history that captures repo setup evolution

## What Still Does Not Exist

Missing or still-unclosed layers include:

- real-data validation for `1` and `>1` active `activity_contact_options`
  states
- a fully validated ready auth baseline against a profile-ready account
- fully validated remote favorite round-trips against a ready account
- test baseline
- lint or format baseline

## Immediate Implication

Open slices now exist, but three are currently blocked:

- `016-native-detail-real-contact-options`: blocked by missing real `1` and
  `>1` contact-option data in the shared backend
- `017-native-auth-runtime-baseline`: blocked by shared auth sign-up failing
  with `Database error saving new user` in the checked environment and by the
  lack of a validated ready account
- `018-native-remote-favorites`: blocked behind `017` and the absence of a
  validated ready account for round-trip checks

Current next action candidates:

- unblocking shared backend data for contact-option validation
- unblocking shared auth readiness or supplying a prepared ready account for
  mobile validation
- re-running ready-account validation for remote favorites once auth is
  unblocked

Current runtime note:

- the repository was originally scaffolded on Expo SDK 55 and then downgraded to SDK 54 on 2026-04-18 so the app can be previewed on a physical phone through the default Expo Go store build during the current rollout window
- `@react-native-async-storage/async-storage` is now aligned to the Expo SDK 54
  runtime contract at `2.2.0`, and the Supabase client no longer lets missing
  native auth storage crash the public catalog bootstrap
- the current shared auth environment rejected an anonymous validation sign-up
  with `Database error saving new user`, so auth/favorites closure cannot be
  claimed yet from this repo alone
