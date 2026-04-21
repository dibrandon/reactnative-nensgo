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

The current reopened demo slice still keeps the scope narrow. It adds only:

- simple text search
- three stable filters: `city`, `category`, and `ageBand`
- a dedicated filters screen with preserved explore state
- a real public catalog baseline from the shared Supabase backend without mock
  fallback

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

## Phase 8

Name: Demo-oriented native explore refinement

- Goal: sharpen the POC demo around native catalog search, filtering, and preserved back navigation context
- Status: Completed on 2026-04-18
- Expected outputs:
  - shared explore state under the explore stack
  - text search across the current lean mobile catalog fields
  - a full-screen filters route
  - active filter feedback and empty-state recovery
- Exit criteria:
  - the demo story is `Explorar + buscar + filtrar`
  - search and filters survive round-trips into filters and detail
  - `Cuenta` remains secondary and detail remains functional but non-protagonist

Completed result:

- `Explorar` now exposes visible search, filter entry, counts, chips, and empty-state recovery
- `/explore/filters` now exists as a full-screen draft-based filter screen
- the explore stack now preserves state across catalog, filters, and detail
- detail back behavior now follows the same back-or-fallback rule as the filters flow

## Phase 9

Name: Product-facing runtime cleanup

- Goal: remove visible meta narration from routed runtime screens and turn `Cuenta` into a static demo-friendly user mock
- Status: Completed on 2026-04-18
- Expected outputs:
  - account mock screen with visible `USUARIO` and fake favorites
  - removal of demo/POC/process narration from routed screens
  - repo docs updated to reflect the product-facing runtime tone
- Exit criteria:
  - `Explorar`, `Filtros`, detail, `Cuenta`, and not-found read like runtime product surfaces
  - the account badge reads `Demo 5`
  - no dead visible account feasibility path remains mounted in the router

Completed result:

- `Cuenta` now mounts a static demo profile with `USUARIO`, `Sitges`, and fake favorites
- the visible runtime no longer shows the former account feasibility explainer
- `Explorar`, `Filtros`, detail, and not-found now use shorter product-facing copy
- the former feasibility-only account artifacts were removed from the mounted runtime path

## Phase 10

Name: Compact catalog card alignment

- Goal: align the mobile browse card more closely with the public NensGo reference and increase visible catalog density on phone screens
- Status: Completed on 2026-04-18
- Expected outputs:
  - tighter card media ratio
  - more compact card copy and metadata treatment
  - denser `Explorar` grid that shows roughly four cards across two rows on a phone
- Exit criteria:
  - catalog cards feel visibly closer to the public browse reference
  - the app keeps current search, filter, empty-state, and detail behavior intact
  - the density improvement stays presentation-only and does not expand the data contract or product scope

Completed result:

- `CatalogActivityCard` now uses a tighter `4:3` media block, smaller local badges, shorter copy, and a lighter inline CTA
- `Explorar` now renders cards in a two-column mobile grid instead of a single-column stack
- search, filters, empty-state handling, and detail navigation stayed intact while the catalog presentation became denser

## Phase 11

Name: Public card correction

- Goal: correct the browse card regression and realign `Explorar` with the supplied web reference
- Status: Completed on 2026-04-18
- Expected outputs:
  - corrected web-like card hierarchy
  - local in-memory heart toggle in the explore stack
  - tighter `Explorar` header that surfaces cards earlier
- Exit criteria:
  - the first row no longer reads as stretched image blocks
  - the heart toggles locally without opening detail
  - `Cuenta` remains unsynced and unchanged

Completed result:

- `CatalogActivityCard` now follows the corrected hierarchy from the supplied web screenshot instead of the previous image-heavy variant
- the heart toggle now exists as local in-memory state inside the explore stack only
- `Explorar` now uses a tighter header so the browse grid appears earlier without changing search or filter behavior

## Phase 12

Name: Card media aspect fix

- Goal: remove the remaining stretched-media regression from the current browse card rendering
- Status: Completed on 2026-04-18
- Expected outputs:
  - `4:3` media constraint owned by the wrapper
  - image fill behavior that respects the constrained wrapper
  - grid alignment hardened against stretch
- Exit criteria:
  - the first row no longer renders as tall image columns
  - the corrected card content from slice `012` becomes visible as intended

Completed result:

- the `4:3` browse ratio now lives on the media wrapper instead of the image
- the image now fills the constrained wrapper and no longer drives the card by its intrinsic ratio
- the explore grid now explicitly aligns items to the top to avoid implicit stretch behavior

## Phase 13

Name: Native real catalog baseline without mocks

- Goal: replace the fake catalog runtime with an honest real-data baseline while
  keeping auth, favorites, and real contact out of scope
- Status: Completed on 2026-04-21
- Expected outputs:
  - public catalog reads through shared Supabase view `catalog_activities_read`
  - explicit mobile read-row mapper
  - no runtime mock catalog fallback
  - no fake account profile
  - no fake favorite interaction
  - detail aligned to real data without `contactPhone`
- Exit criteria:
  - `Explorar` loads real activities from Supabase
  - search and filters still work on loaded real data
  - detail renders real activity data and stays honest about contact being
    pending
  - `Cuenta` no longer pretends that auth exists

Completed result:

- the app now includes a minimal mobile Supabase client for public catalog reads
- the catalog repository now reads `catalog_activities_read` with no runtime
  mock fallback
- search and filters still run over the loaded real activities
- detail no longer depends on `contactPhone` and now exposes an honest
  non-operational contact block
- `Cuenta` now shows runtime status instead of a fake user
- fake favorite interaction has been removed instead of being left as a demo

## Phase 14

Name: Native catalog image URL hardening

- Goal: resolve the current real catalog media debt without changing unrelated
  runtime scope
- Status: Completed on 2026-04-22
- Expected outputs:
  - observed-image contract inspection
  - mapper hardening for the current relative `image_url` format
  - real media in cards and detail whenever the backend path is already
    resolvable
- Exit criteria:
  - the current relative image contract resolves into mobile-ready absolute URLs
  - the fallback mark remains only for absent or still-unresolvable media

Completed result:

- the current shared backend image format was confirmed as relative paths such
  as `es/barcelona/sitges/act_5.jpg`
- those assets were confirmed to resolve through the shared Supabase
  `activities` storage bucket
- the mobile mapper now converts that observed relative path into absolute URLs
  so the current real catalog rows render their real images

## Phase 15

Name: Native detail real contact options

- Goal: connect `activity_contact_options` into the mobile detail flow
- Status: Blocked on 2026-04-22
- Expected outputs:
  - real contact-option seam for detail
  - zero/one/many state handling
  - no fallback to center contact or hardcoded WhatsApp
- Exit criteria:
  - zero-contact, one-contact, and many-contact states are all validated with
    real backend data

Current result:

- the mobile detail runtime now reads `activity_contact_options`
- the zero-option disabled state, one-option direct path, and many-option
  chooser path are implemented
- closure is blocked because the checked shared backend still returns `0` active
  contact rows for the current visible catalog, so `1` and `>1` remain
  unvalidated in real data

## Phase 16

Name: Native auth runtime baseline

- Goal: add a narrow real session baseline for mobile without expanding to the
  full web auth migration
- Status: Blocked on 2026-04-22
- Expected outputs:
  - persisted session storage
  - bootstrap and state-change listening
  - live account surface
  - sign-out
- Exit criteria:
  - the baseline is proven with a real ready account or equivalent real backend
    evidence

Current result:

- the repo now includes a real mobile auth/session provider and live account
  states around an email/password baseline
- session persistence and sign-out are implemented in code
- closure is blocked because validation sign-up against the shared backend
  returned `Database error saving new user`, and no ready account was available
  in-repo to prove the authenticated `ready` state end to end

## Phase 17

Name: Native remote favorites

- Goal: restore the heart affordance only as real remote persistence
- Status: Blocked on 2026-04-22
- Expected outputs:
  - remote favorites provider
  - hearts in explore and detail
  - honest gating for anonymous or not-ready users
- Exit criteria:
  - add/remove/reload are proven against the real backend for a ready account

Current result:

- explore and detail now mount hearts against `user_favorite_activities`
- anonymous or not-ready users are redirected honestly to `Cuenta` instead of
  seeing fake persistence
- closure is blocked behind the same auth-readiness gap that currently blocks
  `017`

## Sequencing Rule

Do not skip phases unless repo reality changes and the roadmap is updated first.
