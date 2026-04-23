# 018-native-remote-favorites SPEC

## Status

Blocked on 2026-04-22

## Problem

The native runtime correctly removed fake favorite interaction in the real
catalog baseline. That keeps the app honest, but it also means the product has
no saved-activity behavior at all until a real user-linked persistence layer is
added.

## Objective

Reintroduce favorites only as real remote persistence for an authenticated,
profile-ready user, with no local fake state and no misleading affordance for
anonymous users.

## In Scope

- load remote favorites for the authenticated user
- add a favorite remotely
- remove a favorite remotely
- expose real favorite state back into explore and detail
- keep anonymous or not-ready users in an honest blocked/auth-required state

## Out Of Scope

- local favorite migration
- analytics for favorite events
- optimistic fake persistence
- favorites without real auth/session

## Constraints

- remote favorites depend on the auth baseline already existing
- no fake local state can become truth again
- blocked or unauthenticated states must be explicit

## Acceptance Criteria

- authenticated, profile-ready users can add and remove favorites remotely
- explore and detail reflect the remote favorite truth
- refresh or reload preserves the favorite state from backend
- anonymous users do not see fake persistence

## Done Means

This slice is done when the heart represents real remote state only, not demo
state, and it disappears or routes honestly when the user cannot yet use it.
