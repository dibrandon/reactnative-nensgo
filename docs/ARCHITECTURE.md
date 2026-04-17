# Architecture

## Current Implemented Architecture

As of 2026-04-17, the implemented architecture is documentation-only.

The repository currently contains:

- SDD operating documents
- no application runtime
- no source tree
- no dependency graph

## Provisional Target Architecture For The POC

This is a target direction, not implemented reality.

### Platform Direction

- Expo-managed React Native project
- TypeScript-first setup
- mock-friendly boundaries so the POC does not depend on backend completion

### Architectural Layers

The POC should evolve in thin layers:

1. app scaffold and navigation shell
2. shared visual primitives and tokens
3. feature slices for catalog and detail
4. feasibility layer for auth-related integration
5. evaluation artifacts for whether the POC should continue

### Module Direction

Once the app exists, prefer a structure that keeps feature code localized and shared concerns explicit. At a minimum, expect separate areas for:

- app shell and navigation
- shared UI or theme primitives
- feature modules
- mock data or adapters
- configuration and environment boundaries

## Decisions Already Made

- The repo will use spec-driven development as its operating model.
- Expo is the default starting point unless later repo reality or explicit user instruction overrides it.

## Decisions Explicitly Deferred

These decisions should not be invented before the app scaffold task:

- routing choice inside Expo
- state management approach beyond local needs
- backend data access strategy
- auth provider integration details
- analytics and observability stack

## Architecture Guardrails

- Do not port a web architecture blindly into mobile.
- Keep the POC thin and reversible.
- Prefer seams and mocks over premature backend coupling.
- Record real decisions in `docs/DECISIONS_LOG.md`.
