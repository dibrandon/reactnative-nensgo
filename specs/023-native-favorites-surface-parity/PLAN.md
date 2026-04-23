# 023-native-favorites-surface-parity PLAN

## Metadata

- Status: Partial
- Date opened: 2026-04-23
- Last updated: 2026-04-23
- Branch: `feat/native-web-frontend-parity`
- Commit type: `feat`
- Commit scope: `favorites`
- Commit subject draft: `add mobile favorites surface parity`
- Spec reference: `023-native-favorites-surface-parity`
- Plan reference: `specs/023-native-favorites-surface-parity/PLAN.md`

## Context

The web frontend already has a protected favorites destination plus a dedicated
favorites detail surface. Mobile has only the remote favorite seam in Explore
and detail, with no actual favorites destination yet.

## Current State

- remote favorite read/write already exists in mobile
- Explore/detail hearts already talk to `user_favorite_activities`
- non-ready users are sent to `Cuenta`, but the original favorite intent is not
  resumed
- there is no `Favoritos` tab, list, or detail route

## Goal

Ship a real favorites destination in mobile and wire it into the protected
intent model introduced by `022`.

## In Scope

- favorites tab
- favorites list
- favorites detail
- remove-and-return behavior
- protected intent resume for open/toggle favorite actions

## Out Of Scope

- local migrations
- favorite analytics
- broader navigation redesign beyond what parity needs

## Assumptions To Avoid

- assuming a heart in Explore/detail is enough to claim favorites parity
- assuming sending the user to account without resume is acceptable
- assuming favorites order can ignore the remote created-at order

## Touched Files

- `specs/023-native-favorites-surface-parity/`: slice spec and plan
- `src/app/(tabs)/_layout.tsx`: add the favorites tab
- `src/app/(tabs)/favorites/`: favorites routes
- `src/features/favorites/`: list composition and route-facing helpers
- `src/features/catalog/components/`: shared detail core and intent-triggering
  hearts
- `src/features/account/hooks/useAuthSession.tsx`: intent resume integration
- `docs/`: status, roadmap, state, debt, and decisions updates

## Risks

- adding the tab could disturb current navigation assumptions
- detail reuse could duplicate logic if not factored carefully
- unresolved favorite ids could create confusing empty states

## Mitigations

- keep tab labels explicit and stable
- extract a shared detail core before favorites detail mounts it
- model “unresolved favorites” as a distinct honest state

## Execution Sequence

1. add the favorites tab and route tree
2. implement favorites list states from remote favorite ids plus catalog data
3. mount favorites detail on the shared detail core
4. wire protected intents to resume favorite actions after ready access

## Validation

- `npm run typecheck`
- `npx expo export --platform web`
- `git diff --check`
- manual checks for:
  - favorites tab navigation
  - loading/error/empty/list states
  - remove in favorites detail returns to the list
  - favorite intent resumes after login/onboarding

## Definition Of Done

- mobile exposes a full favorites surface
- favorites stay remote-only and honest
- protected actions resume correctly after access becomes ready

## Outcome

Implemented in code on 2026-04-23.

- the app shell now exposes `Favoritos` as a first-class tab
- favorites list and favorites detail now exist as native routes
- favorite ordering follows the remote created-at order exposed by
  `user_favorite_activities`
- removing a favorite from its detail route now returns to the list
- the open-favorites and toggle-favorite flows now resume through the protected
  intent model
- live round-trip validation still depends on a ready account in the shared
  backend environment

## Follow-Ups

- consider favorite analytics only if the web product later closes that line
