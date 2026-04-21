# Project State

## Snapshot

Last updated: 2026-04-21

- Current branch: `feat/native-real-catalog-no-mocks`
- Git history: initialized with traceable SDD baseline commits
- Git remotes: `origin` configured
- Application code: Expo Router shell, Supabase-backed public catalog with search and filters, full-screen detail route with honest non-operational contact state, and an honest account status surface
- Build tooling: Expo SDK 54
- Package manager choice: npm
- Mobile stack in code: Expo Router + TypeScript
- CI or quality gates: absent
- Backend or API contract: public catalog read through shared Supabase view `catalog_activities_read`

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
- full-screen detail route under `src/app/(tabs)/explore/[activityId].tsx`
- an account feature module with an honest runtime status surface
- final POC evaluation artifact under `docs/POC_EVALUATION.md`
- Expo Go compatibility slice that pins the current runtime to SDK 54
- a completed demo slice for native catalog search and filters under `specs/009-native-explore-search-filters/`
- a completed real-catalog baseline slice under `specs/014-native-real-catalog-no-mocks/`
- phased roadmap
- feature registry
- tech debt tracker
- decisions log
- first spec and first plan for bootstrap
- initial git history that captures repo setup evolution

## What Still Does Not Exist

Missing implementation layers include:

- real auth runtime beyond the current account status surface
- real contact options inside the detail flow
- remote favorites
- test baseline
- lint or format baseline

## Immediate Implication

No further approved slices are currently open.

Current next action candidates:

- connect real `activity_contact_options` into the mobile detail flow
- open a real mobile auth slice
- add remote favorites only after auth exists

Current runtime note:

- the repository was originally scaffolded on Expo SDK 55 and then downgraded to SDK 54 on 2026-04-18 so the app can be previewed on a physical phone through the default Expo Go store build during the current rollout window
