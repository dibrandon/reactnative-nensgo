# 023-native-favorites-surface-parity SPEC

## Status

Planned on 2026-04-23

## Problem

Mobile already has the backend seam for remote favorites, but it still lacks
the equivalent frontend surface that exists in `nenkatsu/main`: a dedicated
favorites destination, an empty/error/list experience, a routed favorites
detail surface, and protected-intent resume that returns the user to the
original favorite action after access is ready.

## Objective

Add a true mobile favorites surface that matches the web frontend's functional
direction while staying native in navigation and preserving the current RN
background.

## In Scope

- `Favoritos` as a top-level tab
- favorites list states
- favorites detail route under that tab
- reuse of the shared detail core with favorites-specific behavior
- protected favorite intents from explore and detail

## Out Of Scope

- favorite analytics
- local favorite migration
- internal routes
- non-favorites protected actions beyond the concrete parity cases

## Constraints

- favorites must stay remote truth only
- anonymous or not-ready users must not see fake persistence
- removing a favorite in favorites detail should return to the list, mirroring
  the web behavior

## Acceptance Criteria

- mobile has a dedicated favorites tab
- the list shows loading, error, empty, unresolved, and resolved states
- favorites detail uses the shared detail core but keeps favorites-specific
  remove-and-return behavior
- hearts in Explore/detail can resume their original intent after access and
  onboarding are completed

## Done Means

This slice is done when favorites are no longer just a hidden backend seam in
mobile, but a real user-facing surface with honest protected behavior and no
fake persistence.
