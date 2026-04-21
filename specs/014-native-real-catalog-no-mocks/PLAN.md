# 014-native-real-catalog-no-mocks PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-21
- Last updated: 2026-04-21
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `refactor`
- Commit scope: `native`
- Commit subject draft: `replace mock catalog runtime with real baseline`
- Spec reference: `014-native-real-catalog-no-mocks`
- Plan reference: `specs/014-native-real-catalog-no-mocks/PLAN.md`

## Context

The shared backend already exposes a real catalog read model through
`catalog_activities_read`, but the native app still runs on local mock data and
fake runtime surfaces. This slice converts the app into an honest real-catalog
baseline without mixing in auth or remote favorites yet.

## Current State

- the app runs on Expo Router + TypeScript
- catalog list and detail read from a mock repository backed by
  `catalogActivityMocks`
- detail contact is built from `contactPhone`
- explore owns a fake local heart toggle
- `Cuenta` mounts a fake user profile and fake favorites
- there is no mobile Supabase client yet

## Goal

Ship a mobile baseline that reads the catalog from Supabase, keeps explore and
detail functional on real data, removes fake runtime affordances, and leaves
future auth/contact/favorites work honest and clearly deferred.

## In Scope

- mobile Supabase client and env contract
- remote catalog read-row contract and mapper
- real catalog repository for list/detail reads
- real-data explore flow with current search and filters
- detail without fake contact action
- honest account status surface
- SDD doc updates

## Out Of Scope

- auth runtime or profile provisioning
- remote favorites
- analytics
- real contact options fetch and CTA execution
- backend changes

## Assumptions To Avoid

- assuming missing env should fall back to mock data
- assuming `contactPhone` is still a valid future contract
- assuming hearts can stay interactive as a harmless demo affordance
- assuming the mobile app should invent a backend contract that diverges from
  the sibling repo

## Touched Files

- `package.json`: add the minimum Supabase/RN polyfill dependencies
- `package-lock.json`: lockfile update after install
- `.env.example`: document required public env vars
- `specs/014-native-real-catalog-no-mocks/`: slice spec and plan
- `src/shared/lib/supabase/supabaseClient.ts`: minimal public-read client
- `src/features/catalog/models/`: real read-row contract and cleaned mobile
  presentation contract
- `src/features/catalog/data/catalogRepository.ts`: real repository backed by
  `catalog_activities_read`
- `src/features/catalog/hooks/`: list/detail hooks and explore provider cleanup
- `src/features/catalog/components/`: card, explore, and detail cleanup
- `src/features/catalog/helpers/catalogDetailPresentation.ts`: remove fake
  contact dependency
- `src/features/catalog/data/catalogImageSources.ts`: remote-image handling with
  honest visual fallback
- `src/app/(tabs)/account.tsx`: mount the new honest account status surface
- `src/features/account/components/`: honest account status screen
- `docs/`: state, architecture, roadmap, status, debt, and decisions updates

## Risks

- real image URLs may not arrive in a mobile-ready absolute format
- the existing UI contract may drift if the mapper is not explicit
- removing fake favorites could leave visual gaps in the current browse card
- failing Supabase config could be mistaken for "the app is broken" unless the
  error state is explicit

## Mitigations

- inspect real catalog rows before finalizing the mapper
- keep a dedicated `CatalogActivityReadRow -> CatalogActivity` boundary
- simplify the card instead of leaving a disabled fake heart
- surface configuration/read errors directly through existing state panels

## Execution Sequence

1. add the spec/plan and the minimal Supabase client/env contract
2. inspect the real read model and implement the remote catalog mapper
3. replace the mock repository and hooks with the real repository
4. remove fake favorite affordances from explore
5. remove `contactPhone` dependency and make detail contact honest
6. replace the fake account screen with an honest status surface
7. update docs and close the slice with small reviewable commits

## Validation

- `npm install`
- `npm run typecheck`
- start Expo and verify:
  - real catalog load
  - search on loaded data
  - filters on loaded data
  - detail on real activity data
  - no fake heart interaction
  - honest `Cuenta`
- break Supabase env intentionally and verify:
  - error state is honest
  - no fallback to mocks appears
- search the runtime for removed fake dependencies:
  - `catalogActivityMocks`
  - `mockCatalogRepository`
  - `contactPhone`
  - `toggleFavorite`
  - `isFavorite`
  - `AccountMockScreen`
  - `accountMockProfile`

## Definition Of Done

- the catalog reads from Supabase
- the runtime contains no mock fallback path for catalog
- detail no longer depends on `contactPhone`
- account and favorites no longer pretend to be real
- docs describe the new baseline honestly
- the work is closed through small Conventional Commits, not one oversized dump

## Outcome

Pending.

## Follow-Ups

- integrate real `activity_contact_options` into mobile detail
- add real mobile auth runtime
- add remote favorites once auth exists
