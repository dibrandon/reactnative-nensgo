# 018-native-remote-favorites PLAN

## Metadata

- Status: Blocked
- Date opened: 2026-04-22
- Last updated: 2026-04-22
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `feat`
- Commit scope: `favorites`
- Commit subject draft: `add remote favorites on top of mobile auth`
- Spec reference: `018-native-remote-favorites`
- Plan reference: `specs/018-native-remote-favorites/PLAN.md`

## Context

The real catalog baseline deliberately removed fake hearts. Once mobile has a
real session baseline, favorites can return only if they persist against the
shared backend.

## Current State

- there is no runtime favorite interaction in mobile
- the sibling repo already uses `user_favorite_activities` as the durable
  source of truth
- mobile currently has no auth provider or authenticated user state yet

## Goal

Restore the heart affordance only for real remote favorites, with honest
blocking when the user is not authenticated or not profile-ready.

## In Scope

- remote favorite read/write hook or provider
- real heart affordance in explore and detail
- authenticated/profile-ready gating
- honest account redirect or blocked state for users who cannot favorite yet

## Out Of Scope

- local favorite migration
- favorite analytics
- profile provisioning

## Assumptions To Avoid

- assuming hearts can return before auth exists
- assuming optimistic local state is harmless if the backend later disagrees
- assuming every authenticated user is ready for favorite writes

## Touched Files

- `specs/018-native-remote-favorites/`: slice spec and plan
- `src/features/favorites/`: remote favorite state and hook/provider
- `src/features/catalog/components/`: browse/detail hearts tied to real state
- `src/app/_layout.tsx` or the relevant feature provider seam if a global
  favorites provider is mounted
- `docs/`: status, roadmap, state, debt, and decisions updates

## Risks

- favorite writes may fail for authenticated users without a valid app profile
- reintroducing hearts too early could blur truth again

## Mitigations

- gate write access on authenticated/profile-ready state
- keep anonymous states honest and route users to `Cuenta`
- prefer confirmed backend writes over optimistic fake behavior

## Execution Sequence

1. build the remote favorites state seam on top of the auth baseline
2. load the current user's remote favorites
3. reintroduce hearts in explore and detail only against that real state
4. validate add/remove/reload behavior against the backend
5. update docs and close the slice if real validation is possible

## Validation

- `npm run typecheck`
- `cmd /c npx expo export --platform web`
- verify:
  - anonymous user sees honest blocked/auth-required favorite behavior
  - authenticated ready user can add and remove favorites remotely
  - refresh preserves remote favorite truth

## Definition Of Done

- hearts are backed by remote data only
- anonymous or not-ready users are handled honestly
- no fake favorite logic remains

## Outcome

Blocked on 2026-04-22.

The runtime now has a remote favorites provider, real hearts in explore and
detail, honest redirects to `Cuenta` for users who are not authenticated or not
profile-ready, and real Supabase read/write code against
`user_favorite_activities`. Closure remains blocked because the auth baseline
could not be validated with a ready account in the checked environment, so the
favorite round-trip could not be proven end to end with real authenticated
state.

## Follow-Ups

- validate add/remove/reload against a ready authenticated account once `017`
  is unblocked
- consider a later slice only if favorite analytics or migration is truly needed
