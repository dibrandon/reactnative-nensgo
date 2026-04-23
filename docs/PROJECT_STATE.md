# Project State

## Snapshot

Last updated: 2026-04-23

- Current branch: `feat/native-web-frontend-parity`
- Current execution program: parity audit and implementation pass against
  `D:\dev\nensGo\nenkatsu` `main`
- Git history: initialized with traceable SDD baseline commits
- Git remotes: `origin` configured
- Application code: Expo Router shell, Supabase-backed public catalog with
  search and filters, hardened real catalog media, shared detail-core routes
  for Explore and Favoritos, a web-aligned mobile auth/account/profile surface
  with onboarding and Google attempt, and remote favorites exposed as a
  first-class tab backed by protected-intent resume
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
- runnable Expo shell with `Explorar`, `Favoritos`, and `Cuenta`
- `src/app` router structure and shared visual baseline
- a mobile Supabase client for public catalog reads under `src/shared/lib/supabase`
- real catalog reads through `catalog_activities_read` under `src/features/catalog`
- hardened catalog image normalization against the shared Supabase `activities`
  storage bucket
- full-screen detail route under `src/app/(tabs)/explore/[activityId].tsx`
- live contact-option reads for detail under `src/features/catalog`
- a shared detail core reused by Explore and Favoritos
- an account feature module with web-aligned auth, onboarding, and account
  states under `src/features/account`
- a first-class favorites tab and detail route under `src/features/favorites`
- protected-intent persistence and resume for favorite/profile access
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
- a parity-audit slice plus implemented parity runtime slices under:
  - `specs/020-native-web-parity-audit/`
  - `specs/021-native-public-catalog-detail-parity/`
  - `specs/022-native-auth-account-profile-parity/`
  - `specs/023-native-favorites-surface-parity/`

## What Still Does Not Exist

Missing or still-unclosed layers include:

- real-data validation for `1` and `>1` active `activity_contact_options`
  states
- end-to-end Google OAuth validation against the shared Supabase redirect
  configuration
- a fully validated ready auth baseline against a profile-ready account
- fully validated remote favorite round-trips against a ready account
- test baseline
- lint or format baseline

## Immediate Implication

The parity runtime now exists in code, but slices `021`-`023` remain partial
until live backend/config validation closes their remaining blockers.

Historical blocked context still exists in:

- `016-native-detail-real-contact-options`: blocked by missing real `1` and
  `>1` contact-option data in the shared backend
- `017-native-auth-runtime-baseline`: blocked by shared auth sign-up failing
  with `Database error saving new user` in the checked environment and by the
  lack of a validated ready account
- `018-native-remote-favorites`: blocked behind `017` and the absence of a
  validated ready account for round-trip checks

Current parity runtime reality:

- `020-native-web-parity-audit`: completed and documented
- `021-native-public-catalog-detail-parity`: implemented in code, pending live
  `1` and `>1` contact validation
- `022-native-auth-account-profile-parity`: implemented in code, pending live
  Google and ready-account validation
- `023-native-favorites-surface-parity`: implemented in code, pending live
  ready-account round-trip validation

Explicit exclusions for this pass:

- `/para-centros`
- `/internal/*`
- `/api/internal/pvi`
- `landingb2b`

Non-negotiable visual guardrail:

- the global RN background stays unchanged during this parity pass

Current runtime note:

- the repository was originally scaffolded on Expo SDK 55 and then downgraded to SDK 54 on 2026-04-18 so the app can be previewed on a physical phone through the default Expo Go store build during the current rollout window
- `@react-native-async-storage/async-storage` is now aligned to the Expo SDK 54
  runtime contract at `2.2.0`, and the Supabase client no longer lets missing
  native auth storage crash the public catalog bootstrap
- the code now attempts Google OAuth through Expo WebBrowser and completes
  onboarding through `ensure_my_profile(...)`, but those paths still need live
  validation against the checked shared environment
