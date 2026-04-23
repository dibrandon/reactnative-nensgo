# Decisions Log

## 2026-04-17 - ADR-0001 - Use SDD As The Repo Operating Model

Decision:

The repository will use spec-driven development as its default way of working for non-trivial tasks.

Why:

The repo started empty. Without durable specs, plans, and state docs, autonomous work would drift immediately.

Impact:

- non-trivial work requires a spec and a plan
- docs must be kept aligned with implementation
- future tasks must read repo context before coding

## 2026-04-17 - ADR-0002 - Default To Expo For The Mobile POC

Decision:

Expo is the default target stack for the first React Native scaffold unless later repo reality or explicit user instruction overrides it.

Why:

The repository currently has no mobile implementation, and Expo keeps the first POC slice narrow and fast to validate.

Impact:

- the next implementation plan should assume Expo first
- routing and state details remain open until the scaffold phase

## 2026-04-17 - ADR-0003 - Close Each Completed Slice With A Traceable Commit

Decision:

Every completed slice must end with a final git commit that uses a Conventional Commit style subject in English and a long-form body.

Why:

The repository is intended for long-horizon autonomous work. A developer must be able to reconstruct scope, validation, and remaining work directly from git history if they need to take over in an emergency.

Impact:

- completed slices are not done until their final commit exists
- commit subjects follow `<type>(<scope>): <imperative summary>`
- commit bodies must include `Context`, `Changes`, `Validation`, and `Follow-ups`
- each closing commit must reference its active spec and plan
- `wip` is not the standard shared history format for this repository

## 2026-04-17 - ADR-0004 - Validate The Native POC Through A Focused Family Loop

Decision:

The React Native POC will validate NensGo through a focused family loop instead of attempting route parity with the current web product.

Why:

The current web baseline contains public catalog, detail seams, auth seams, favorites, internal routes, and web-specific surfaces. Porting those structures directly into native would blur the real question, which is whether the core family discovery experience feels worthwhile as an app.

Impact:

- the native shell starts with `Explorar` and `Cuenta`
- the long web landing is not migrated as-is into mobile
- detail is expected later as a full-screen route, not as a modal carryover
- `/para-centros`, `/pvi`, admin, SEO, and full auth are outside the baseline POC scope
- future catalog slices should use a lean presentation contract instead of mirroring the current web/domain model

## 2026-04-17 - ADR-0005 - Use `src/app` With Expo Router For The Native Shell

Decision:

The runtime shell uses Expo Router with `src/app` as the application root.

Why:

The repo already needed a clean separation between root config files and growing application code. Expo Router officially supports `src/app`, which fits the SDD-driven layout better and keeps future feature modules under `src`.

Impact:

- root config files remain at the repo root
- routed screens live under `src/app`
- future shell, catalog, detail, and account slices should follow the `src`-first structure

## 2026-04-17 - ADR-0006 - Establish A Thin Shared Visual Baseline Before Catalog Work

Decision:

Before adding catalog and detail behavior, the native POC will use a small shared visual system built around reusable typography, surface, button, brand, and screen framing primitives.

Why:

The shell was already running, but its styling was still tied too closely to placeholder screens. Landing catalog and detail directly on top of screen-local styles would create churn and make the POC feel like a template adaptation instead of a deliberate native build.

Impact:

- Nunito Sans is the shared font family for the current baseline
- shared primitives live under `src/shared/ui`
- shell screens and the fallback route use the same visual layer
- later feature slices should extend the visual system only when a new feature surface genuinely requires it

## 2026-04-17 - ADR-0007 - Use Curated Mobile Catalog Mocks Instead Of Porting The Full Web Fallback

Decision:

The native catalog slice uses a curated mobile `CatalogActivity` dataset and a small repository seam instead of importing the full web fallback entities or reproducing their raw fields in runtime code.

Why:

The POC needs enough realism to validate scanning, card design, and future detail flow, but it does not need full domain parity. Pulling raw `activities`, `centers`, and `cities` structures into native would expand the contract early and make later changes harder to reason about.

Impact:

- the mobile catalog contract stays presentation-oriented
- mock data lives inside the repo and does not depend on the sibling web project at runtime
- image assets are copied only for the curated activity set
- later slices must justify any contract expansion beyond card, basic detail, and simple contact needs

## 2026-04-17 - ADR-0008 - Land Activity Detail As A Full-Screen Route With Simple External Contact

Decision:

The native POC detail experience uses a dedicated route under `explore` and a simple external WhatsApp CTA built from the existing contact phone field.

Why:

The web reference still contains modal-oriented detail surfaces, but that interaction model is not the right validation target for the native app. The POC needs a clear route transition and a simple contact handoff without inventing favorites, forms, or backend orchestration.

Impact:

- detail lives at `/explore/[activityId]`
- catalog cards are responsible only for navigation into detail
- contact remains an external handoff, not an in-app workflow
- favorites and auth remain outside the detail slice

## 2026-04-17 - ADR-0009 - Use `Cuenta` As An Auth Feasibility Surface Before Wiring Mobile Auth

Decision:

The `Cuenta` tab documents current anonymous runtime state, observed web auth facts, missing inputs, and the proposed mobile auth path before any real Supabase or Google integration is attempted in native.

Why:

The POC needs to answer whether auth is a sensible next investment, not to fake a sign-in flow. The repo still lacks credentials, redirects, and approved protected actions, so an honest feasibility layer is more useful than a half-connected auth screen.

Impact:

- `Cuenta` is no longer a generic placeholder
- the account feature module holds a small operational auth-feasibility model
- mobile auth remains intentionally unimplemented until inputs are approved
- future auth work has a visible baseline in-app and in docs

## 2026-04-18 - ADR-0010 - Pin The Repo To Expo SDK 54 For Expo Go Phone Preview

Decision:

The repository runtime is pinned to Expo SDK 54 for now so the app can be opened on a physical phone with the default Expo Go store build during the current SDK 55 rollout window.

Why:

The user's immediate goal is to see the POC on-device through Expo Go, not to move to development builds yet. Official Expo guidance for the current transition window states that the default store build of Expo Go remains on SDK 54 for a short period after SDK 55 released.

Impact:

- current repo state and architecture docs now reflect SDK 54 as the runtime baseline
- the POC behavior stays the same; only the Expo runtime compatibility layer changed
- future upgrades should be deliberate, not automatic, once Expo Go support and project needs align again

## 2026-04-18 - ADR-0011 - Keep Demo Search And Filters Scoped To The Explore Stack

Decision:

The demo-oriented search and filter flow lives in explore-scoped in-memory state and uses a dedicated full-screen filters route inside the existing explore stack.

Why:

The immediate demo goal is to prove native discovery quality, not to introduce app-wide state, persistence, or web-style filter chrome. Keeping the state local to the explore stack preserves context through filters and detail while staying reversible and easy to reason about.

Impact:

- search and filters are preserved while moving between `Explorar`, `Filtros`, and detail
- `searchQuery` is separate from active filter counting
- filter options derive from the full base mock dataset instead of shrinking with current results
- filters apply only when the draft screen confirms `Aplicar`
- no persistence or cross-tab synchronization is implied by this slice

## 2026-04-18 - ADR-0012 - Keep Visible Runtime Copy Product-Facing And Move Account Back To A Static Demo Surface

Decision:

The visible runtime should read like a product demo rather than an internal POC explainer, and the mounted `Cuenta` tab should use a static user mock instead of the previous auth-feasibility screen.

Why:

The previous runtime exposed too much internal rationale across routed screens, especially in `Cuenta`. That was useful for repo exploration, but not for a human-facing demo. The account screen now needs to look credible without pretending that auth exists.

Impact:

- routed screens keep short product-facing or operational copy only
- the only visible meta badge kept in runtime is the account badge, now labeled `Demo 5`
- `Cuenta` shows a static user mock with fake favorites instead of an auth explainer
- auth feasibility remains repo knowledge and future work context, not mounted runtime narration

## 2026-04-18 - ADR-0013 - Use A Compact Two-Column Browse Card For The Demo Catalog

Decision:

The demo catalog should use a compact public-card-inspired layout in a two-column mobile grid instead of the previous tall single-column list.

Why:

The functional explore flow was already working, but the browse surface still felt too editorial and too sparse for a phone demo. The public NensGo reference shows a denser browsing rhythm that better supports quick family scanning.

Impact:

- `Explorar` now prioritizes two-column scan density over the earlier single-column card stack
- card compaction is handled locally inside the catalog card rather than by globally shrinking shared UI primitives
- the visual reference guides presentation only; the mobile runtime still does not aim for web parity
- search, filters, detail navigation, and the lean `CatalogActivity` contract remain unchanged

## 2026-04-18 - ADR-0014 - Correct The Browse Card With Web-Like Hierarchy And Keep Hearts Local To Explore

Decision:

The browse card correction should follow the supplied web hierarchy more closely, and the heart should exist only as local in-memory state inside the explore stack.

Why:

The previous compact-card pass improved density but still left the native browse surface feeling image-dominant and structurally wrong against the screenshots. The user wanted a visible heart affordance, but not a reopened favorites product surface.

Impact:

- the card now uses image, optional `Gratis`, heart, category, title, age, center, city, and a full-width CTA
- the explore provider owns heart state and preserves it across detail round-trips while the stack stays mounted
- `Cuenta` remains a static demo mock and does not sync with the local heart toggle
- the correction stays inside presentation and local interaction scope, not product-grade favorites

## 2026-04-18 - ADR-0015 - Let The Media Wrapper Own The Browse Card Aspect Ratio

Decision:

The browse card's effective `4:3` ratio should be owned by the media wrapper, and the image should fill that wrapper instead of carrying the ratio itself.

Why:

The current preview still rendered the browse cards as stretched media columns even after the hierarchy correction. The remaining issue was rendering ownership: the intrinsic image ratio was still winning in practice.

Impact:

- the card media block now constrains layout before the image is painted
- the image remains `cover`, but no longer dictates the vertical size of the card
- the existing browse hierarchy and local heart behavior remain unchanged

## 2026-04-21 - ADR-0016 - Use The Shared Supabase Catalog Read Model Without Mock Fallback

Decision:

The native catalog runtime now reads from the shared Supabase view
`catalog_activities_read` and does not keep a runtime fallback to curated local
mocks.

Why:

The sibling web repo already closed the real catalog direction, and the native
runtime had reached the point where mock data was hiding truth instead of
helping development. The baseline needed to become smaller, more honest, and
backend-aligned.

Impact:

- `Explorar` and detail now depend on a real Supabase-backed repository seam
- the mobile runtime uses an explicit `CatalogActivityReadRow ->
  CatalogActivity` mapper
- missing env or failed reads now surface honest loading/error states instead of
  falling back silently to fake data

## 2026-04-21 - ADR-0017 - Remove Fake Account, Favorite, And Contact Affordances Until Their Real Paths Exist

Decision:

The mobile runtime should no longer pretend that account, favorites, or contact
already work when those paths are not actually connected.

Why:

The old fake user, fake heart toggle, and old WhatsApp contact seam created a
misleading baseline once the catalog itself became real. Keeping those demo
affordances would blur what exists versus what is still pending.

Impact:

- `Cuenta` now shows an honest status surface instead of a fake user profile
- the explore-local heart toggle has been removed
- detail no longer depends on `contactPhone`
- real mobile auth, remote favorites, and `activity_contact_options` remain
  explicit follow-up slices

## 2026-04-22 - ADR-0018 - Resolve Observed Relative Catalog Image Paths Through The Shared Supabase Activities Bucket

Decision:

The mobile mapper should resolve the currently observed relative `image_url`
contract through the shared Supabase public `activities` bucket instead of
discarding those images as unusable.

Why:

The checked backend returns relative paths such as
`es/barcelona/sitges/act_5.jpg`, and those assets are already publicly
reachable through the shared Supabase storage path. Treating them as unresolved
was needlessly degrading the real catalog demo.

Impact:

- cards and detail now render real media for the current shared catalog rows
- the brand fallback remains only for absent or still-unresolved media
- the normalization stays grounded in the currently observed backend contract

## 2026-04-22 - ADR-0019 - Use Activity Contact Options As The Only Mobile Detail Contact Source

Decision:

The mobile detail screen now uses `activity_contact_options` as its only real
contact source and follows the zero/one/many behavior already closed in the
sibling repo.

Why:

The shared product direction already rejected center-level fallback and
hardcoded WhatsApp. Reopening those paths in mobile would reintroduce fake
runtime behavior after the catalog became real.

Impact:

- zero active options render an honest disabled state
- one active option opens directly
- multiple active options open a chooser surface
- the slice remains blocked until the shared backend exposes real `1` and `>1`
  validation cases

## 2026-04-22 - ADR-0020 - Start Mobile Auth With A Narrow Email Password Session Baseline

Decision:

The first real mobile auth slice uses email/password as the chosen baseline
path, centered on session restore, live account state, and sign-out.

Why:

The repo needed a real session seam before favorites or other user-linked work
could proceed, but it still needed to stay narrower than the full web auth
migration. Email/password is the most contained baseline that still exercises
real session behavior.

Impact:

- the repo now has a live mobile auth/session provider
- `Cuenta` now reflects real auth state instead of fixed copy
- Google OAuth, onboarding, and provisioning stay explicitly out of scope for
  this slice
- the slice remains blocked until the shared auth environment can be validated
  with a ready account

## 2026-04-22 - ADR-0021 - Reintroduce Hearts Only Against Remote Truth And Ready Account State

Decision:

The heart affordance can return in mobile only when it is backed by
`user_favorite_activities` and only for users whose account is ready for real
remote writes.

Why:

The real-catalog baseline deliberately removed fake favorites. Reintroducing the
heart without real remote truth would immediately blur the runtime again.

Impact:

- explore and detail now mount hearts against a remote favorites provider
- anonymous or not-ready users are redirected honestly to `Cuenta`
- favorite closure remains blocked until the auth baseline can be validated with
  a ready account

## 2026-04-22 - ADR-0022 - Keep Public Catalog Bootstrap Independent From Native Auth Storage Startup

Decision:

Expo Go compatibility repairs should align AsyncStorage to the SDK-supported
version and ensure the global Supabase client does not let missing native auth
storage crash the public catalog runtime.

Why:

The repo now contains a real auth/session baseline, but the immediate runtime
failure observed on Expo Go was not a catalog query problem. It was a storage
compatibility problem during global Supabase auth initialization. Letting that
failure take down `Explorar` would couple public catalog truth to optional auth
persistence in the wrong direction.

Impact:

- the repo now pins `@react-native-async-storage/async-storage` to the Expo SDK
  54-compatible `2.2.0`
- the Supabase client resolves native auth storage lazily instead of importing
  it eagerly at module load
- if native storage is unavailable, auth persistence degrades honestly instead
  of crashing the public catalog bootstrap

## 2026-04-23 - ADR-0023 - Use `nenkatsu/main` As The Frontend Source Of Truth For Mobile-Parity Surfaces

Decision:

The active mobile direction now uses `D:\dev\nensGo\nenkatsu` `main` as the
source of truth for frontend behavior wherever the web surface is portable and
reasonable in a native family-facing app.

Why:

The shared backend boundaries and much of the frontend product direction have
already moved in the sibling web repo. Leaving RN on the older “deliberately
not parity” framing would keep docs and implementation targets behind the real
product state. At the same time, blindly porting the full web surface would
pull mobile into B2B, internal, reporting, and SEO-only routes that do not
belong in the app.

Impact:

- mobile parity is now judged against web main for catalog, detail,
  contact-option behavior, auth/account/profile states, favorites, and
  public-surface hardening
- `/para-centros`, `/internal/*`, and `/api/internal/pvi` remain explicitly
  outside the mobile parity target
- the current RN background and global background logic stay unchanged during
  this parity pass
- blocked slices `016`-`018` remain historical truth, while new traced slices
  `020`-`023` carry the parity implementation program
