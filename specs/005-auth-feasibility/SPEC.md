# 005-auth-feasibility SPEC

## Status

Completed on 2026-04-17

## Problem

The native POC now validates the discovery loop, but the `Cuenta` tab still behaves like a pure placeholder. The repo needs an honest auth feasibility layer that shows how identity would fit into the app without pretending that mobile Supabase or Google sign-in is already wired.

## Objective

Turn `Cuenta` into a visible technical feasibility surface that explains the current anonymous state, the likely auth path for mobile, the missing inputs, and the future seams auth would unlock.

## In Scope

- replace the `Cuenta` placeholder with a structured auth feasibility screen
- define a small runtime model for auth feasibility state
- capture the observed auth baseline from the current web product
- make blockers and missing inputs explicit inside the screen
- describe the proposed mobile auth path without implementing the provider flow

## Out Of Scope

- real Supabase integration
- Google OAuth wiring
- protected actions
- profile editing
- favorites
- session persistence implementation

## Constraints

- stay honest about what is and is not implemented
- do not add fake login success states
- do not invent backend contracts or credentials
- keep the screen useful for technical evaluation, not as marketing copy

## Acceptance Criteria

- `Cuenta` is no longer a generic placeholder
- the screen shows the current app state as anonymous browsing
- the screen documents the likely mobile auth path and blockers
- no real sign-in or protected actions are falsely implemented
- the result helps a developer understand what is needed to continue auth work later

## Done Means

This slice is done when `Cuenta` becomes an honest auth feasibility surface that meaningfully informs the next investment decision without claiming that mobile auth already works.
