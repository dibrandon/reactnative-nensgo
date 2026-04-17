# 005-auth-feasibility PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `feat`
- Commit scope: `account`
- Commit subject draft: `add account auth feasibility layer`
- Spec reference: `005-auth-feasibility`
- Plan reference: `specs/005-auth-feasibility/PLAN.md`

## Context

The catalog and detail loop are now in place. The next POC question is not full authentication, but whether the current web auth seam can be translated into a sane native direction without inventing runtime integration that the repo cannot currently support.

## Current State

Current repo reality before implementation:

- `Cuenta` is still a placeholder screen inherited from the shell slice
- the native app has no auth runtime, env vars, redirect config, or provider setup
- the current web product uses Google OAuth through Supabase Auth and requires a city before certain protected actions can continue
- the native POC still has no protected actions that require auth

## Goal

Replace the placeholder account tab with a structured auth feasibility screen that captures current anonymous reality, proposed mobile auth direction, missing inputs, and future seams.

## In Scope

- define a small runtime model for auth feasibility state
- add a dedicated account feature module
- replace the account route content with an auth feasibility screen
- document observed web auth facts inside the runtime surface
- make blockers explicit so the next auth implementation is grounded

## Out Of Scope

- Supabase client setup
- Google sign-in SDK setup
- protected account actions
- persisted account state
- server-side changes
- analytics

## Assumptions To Avoid

- assuming a disabled login button counts as an auth layer
- assuming native auth can be implemented without redirect and credential decisions
- assuming the mobile app already needs every protected action from the web
- assuming feasibility work can live only in docs and does not need a visible app surface

## Touched Files

- `specs/005-auth-feasibility/`: slice spec and plan
- `src/app/(tabs)/account.tsx`: replace the placeholder route content
- `src/features/account/`: add the auth feasibility model and screen components
- `docs/`: status, roadmap, architecture, state, debt, and decisions updates once the slice closes

## Risks

- the screen could drift back into placeholder copy instead of concrete feasibility
- it may accidentally imply that login is almost implemented when required inputs are still absent
- web auth details could be over-copied into mobile even if not all of them are needed yet

## Mitigations

- ground the screen in observed web facts only
- distinguish clearly between current state, proposed path, and blockers
- keep the runtime model small and operational
- avoid CTA patterns that look like a working sign-in flow

## Execution Sequence

1. define the auth feasibility spec and plan
2. model the current auth feasibility state for the native POC
3. implement the account feasibility screen and replace the placeholder route
4. validate that the screen stays honest and does not imply runtime auth exists
5. update docs and close the slice with a `feat(account)` commit

## Validation

- ran `npm.cmd run typecheck`
- ran `cmd /c npx expo export --platform web`
- verified the account route still exports cleanly
- manually confirmed through the runtime screen composition that:
  - `Cuenta` is now a feasibility surface, not a generic placeholder
  - the screen calls out missing auth inputs explicitly
  - no real login or protected behavior appears

## Definition Of Done

- `Cuenta` documents current state, proposed path, and blockers in-app
- the account feature has a small runtime model rather than route-local prose only
- the slice stays honest about the absence of working mobile auth
- docs reflect that the next step becomes final POC evaluation

## Outcome

Completed on 2026-04-17.

The repo now exposes an account feasibility layer that explains anonymous
runtime state, the observed web auth baseline, missing inputs, and the
proposed mobile auth path without pretending auth already works.
Closed in git history with `feat(account): add account auth feasibility layer`.

## Follow-Ups

- close `006-poc-evaluation` with an honest recommendation on whether to continue the native app
- only start real auth wiring when credentials, redirects, and protected actions are explicitly approved
