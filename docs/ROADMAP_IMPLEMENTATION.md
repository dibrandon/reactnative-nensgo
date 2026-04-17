# Roadmap Implementation

This roadmap defines the intended sequence for the React Native POC.

## POC Framing

The native POC is intentionally narrower than the current web baseline.

The validated experience should focus on:

- entering a native app shell
- exploring a family-facing catalog
- opening a full-screen detail route
- understanding how future account and auth can fit

The following are explicitly out of the POC baseline unless a later slice reopens them:

- `/para-centros`
- `/pvi`
- admin or internal surfaces
- full auth and profile behavior
- favorites and protected-action flows
- complex filters
- SEO or web parity work

## Phase 1

Name: SDD foundation and repo bootstrap

- Goal: establish the working system for reliable agent execution
- Status: Completed on 2026-04-17
- Outputs:
  - `AGENTS.md`
  - `PLANS.md`
  - `.codex/config.toml`
  - `docs/`
  - `specs/000-bootstrap/`

## Phase 2

Name: Expo scaffold and navigation shell

- Goal: create the first runnable mobile shell
- Expected outputs:
  - Expo app scaffold
  - TypeScript baseline
  - Expo Router navigation shell
  - safe area handling
  - tabs for `Explorar` and `Cuenta`
  - shell-only branded placeholders
  - basic smoke validation
- Exit criteria:
  - app boots locally
  - both tabs are reachable
  - no catalog, detail, auth, or data work is smuggled into this slice
  - touched files are limited to app setup and shell concerns

## Phase 3

Name: Visual system and tokens

- Goal: define the minimum design primitives needed for consistent screens
- Expected outputs:
  - theme tokens
  - typography and spacing baseline
  - a minimal shared component layer
- Exit criteria:
  - navigation shell and first feature screens can share visual primitives

## Phase 4

Name: Public catalog proof of concept

- Goal: render a browsable catalog with mock or adapter-backed data
- Expected outputs:
  - list screen
  - item card primitive
  - loading and empty states
  - lean `CatalogActivity` boundary sized only for mobile card, basic detail, and simple external contact CTA
- Exit criteria:
  - catalog can be demonstrated without backend dependency ambiguity
  - the mobile data contract does not mirror the full current web model without justification

## Phase 5

Name: Detail proof of concept

- Goal: add a basic detail flow from the catalog
- Expected outputs:
  - dedicated full-screen detail route
  - detail screen
  - simple external contact CTA
  - minimal data contract between list and detail
- Exit criteria:
  - a user can move from list to detail in the POC
  - the detail feels native rather than like a web modal port

## Phase 6

Name: Auth feasibility layer

- Goal: validate whether authentication requirements fit the mobile POC
- Expected outputs:
  - evolution path from the existing `Cuenta` placeholder
  - auth assumptions documented
  - minimal technical path or stub flow
  - explicit blockers if backend inputs are missing
- Exit criteria:
  - feasibility is clear even if full auth is not implemented

## Phase 7

Name: POC evaluation

- Goal: decide whether the prototype should continue and what it would cost
- Expected outputs:
  - summary of what works
  - summary of what is missing
  - recommendation for next investment
- Exit criteria:
  - stakeholders can make a continuation decision using repo artifacts

## Sequencing Rule

Do not skip phases unless repo reality changes and the roadmap is updated first.
