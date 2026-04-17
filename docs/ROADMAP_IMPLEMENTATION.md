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
- Status: Completed on 2026-04-17
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

Completed result:

- Expo runtime added to the repo and later aligned to SDK 54 for Expo Go phone compatibility
- `src/app` now drives Expo Router
- `Explorar` and `Cuenta` render branded placeholder screens
- validation passed through `tsc --noEmit` and `expo export --platform web`

## Phase 3

Name: Visual system and tokens

- Goal: define the minimum design primitives needed for consistent screens
- Status: Completed on 2026-04-17
- Expected outputs:
  - theme tokens
  - typography and spacing baseline
  - a minimal shared component layer
- Exit criteria:
  - navigation shell and first feature screens can share visual primitives

Completed result:

- Nunito Sans is loaded as the shared app font family
- shared text, button, surface, screen, and brand components now exist under `src/shared/ui`
- the shell and not-found route now use the shared visual system instead of screen-local styling
- validation passed through `tsc --noEmit` and `expo export --platform web`

## Phase 4

Name: Public catalog proof of concept

- Goal: render a browsable catalog with mock or adapter-backed data
- Status: Completed on 2026-04-17
- Expected outputs:
  - list screen
  - item card primitive
  - loading and empty states
  - lean `CatalogActivity` boundary sized only for mobile card, basic detail, and simple external contact CTA
- Exit criteria:
  - catalog can be demonstrated without backend dependency ambiguity
  - the mobile data contract does not mirror the full current web model without justification

Completed result:

- `Explorar` now renders a mock-backed catalog list instead of a shell placeholder
- the repo has a dedicated `src/features/catalog` module with model, data seam, hook, and card components
- curated activity mocks were adapted from the current web fallback without porting raw web entities
- validation passed through `tsc --noEmit` and `expo export --platform web`

## Phase 5

Name: Detail proof of concept

- Goal: add a basic detail flow from the catalog
- Status: Completed on 2026-04-17
- Expected outputs:
  - dedicated full-screen detail route
  - detail screen
  - simple external contact CTA
  - minimal data contract between list and detail
- Exit criteria:
  - a user can move from list to detail in the POC
  - the detail feels native rather than like a web modal port

Completed result:

- catalog cards now route into `/explore/[activityId]`
- detail uses the existing lean `CatalogActivity` contract without importing web-only entities
- the detail screen exposes key facts, location, and a simple external WhatsApp CTA
- validation passed through `tsc --noEmit` and `expo export --platform web`

## Phase 6

Name: Auth feasibility layer

- Goal: validate whether authentication requirements fit the mobile POC
- Status: Completed on 2026-04-17
- Expected outputs:
  - evolution path from the existing `Cuenta` placeholder
  - auth assumptions documented
  - minimal technical path or stub flow
  - explicit blockers if backend inputs are missing
- Exit criteria:
  - feasibility is clear even if full auth is not implemented

Completed result:

- `Cuenta` now renders a structured auth feasibility screen instead of a placeholder
- the repo has a dedicated `src/features/account` module with a runtime feasibility model
- the screen captures the observed web auth baseline, missing inputs, and proposed mobile path
- validation passed through `tsc --noEmit` and `expo export --platform web`

## Phase 7

Name: POC evaluation

- Goal: decide whether the prototype should continue and what it would cost
- Status: Completed on 2026-04-17
- Expected outputs:
  - summary of what works
  - summary of what is missing
  - recommendation for next investment
- Exit criteria:
  - stakeholders can make a continuation decision using repo artifacts

Completed result:

- `docs/POC_EVALUATION.md` now captures validated outcomes, open gaps, and continuation criteria
- top-level repo docs now show all planned POC slices as completed
- the repo now closes with a technical recommendation instead of an implicit "keep building" assumption

## Sequencing Rule

Do not skip phases unless repo reality changes and the roadmap is updated first.
