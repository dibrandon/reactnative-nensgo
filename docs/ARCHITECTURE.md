# Architecture

## Current Implemented Architecture

As of 2026-04-22, the implemented architecture contains a runnable Expo shell,
a thin shared visual system, a Supabase-backed public catalog read path with
hardened real media resolution, explore-scoped search and filters, a full-screen
detail route wired to real contact-option states, a live account/auth session
surface, a remote favorites provider gated on ready account state, and the repo
SDD documents.

The repository currently contains:

- SDD operating documents
- Expo SDK 54 runtime dependencies
- `src/app` driven by Expo Router
- a catalog-backed `Explorar` tab plus an honest but still parity-incomplete
  `Cuenta` tab
- stack-scoped explore state for search, filters, counts, and result derivation
- shared theme tokens plus typography primitives
- reusable `src/shared/ui` building blocks for text, buttons, surfaces, pills, brand lockup, and screen framing
- shell-specific placeholder composition built on the shared visual layer
- `src/shared/lib/supabase` with a minimal public-read Supabase client
- `src/features/catalog` with a lean runtime model, a real read-row contract, an explicit `catalog_activities_read -> CatalogActivity` mapper, a Supabase-backed repository seam, explore hooks, a corrected web-like browse card hierarchy without fake heart interaction, and a constrained `4:3` media wrapper
- `src/shared/lib/supabase` now also owns the project-origin helper and the
  persisted auth-session client configuration
- `src/features/catalog` now also includes real image-path normalization against
  the shared Supabase `activities` storage bucket
- a dedicated detail route under `src/app/(tabs)/explore/[activityId].tsx`
- the detail feature now includes an `activity_contact_options` repository,
  hook, URL action helper, and zero/one/many contact state handling
- a dedicated filters route under `src/app/(tabs)/explore/filters.tsx`
- `src/features/account` with a live auth/session provider, app-user read seam,
  and an account surface that still needs parity hardening against web main
- `src/features/favorites` with a remote favorites provider consumed by explore
  and detail

## Current Parity Direction

The active direction is no longer "avoid web parity by default".

The checked mobile repo should now use `D:\dev\nensGo\nenkatsu` `main` as the
source of truth for portable frontend behavior, while still applying native
product judgment.

Parity in this repo means:

- same shared backend boundaries where mobile portability makes sense
- same honest frontend states when backend/config still block closure
- same refusal to use fake data where the web frontend already uses real paths
- same public-surface hardening standard

Parity does not mean:

- matching the web background
- porting web-only routes, internal tooling, SEO structure, or B2B landing
- copying modal mechanics or route names 1:1 into native

Non-negotiable visual guardrail:

- `src/shared/ui/ScreenContainer.tsx` and `src/shared/theme/tokens.ts` define
  the current RN background language and must not be changed for this parity
  pass

## Provisional Target Architecture For The Parity Pass

This is now the implemented direction for the parity pass, with live validation
still pending for some backend/config-dependent paths.

### Platform Direction

- Expo-managed React Native project
- TypeScript-first setup
- Expo Router for app shell navigation
- real-data boundaries where the shared backend is already the product truth

### Architectural Layers

The POC should evolve in thin layers:

1. app scaffold and navigation shell
2. shared visual primitives and tokens
3. feature slices for catalog and detail
4. feasibility layer for auth-related integration
5. evaluation artifacts for whether the POC should continue

### Product Interpretation For Mobile

The mobile app is still not a route-for-route copy of the web frontend.

The intended native interpretation is:

- a focused family loop centered on discovering activities
- a short, app-like `Explorar` entry point instead of the web landing
- a full-screen filters route instead of dense in-list web controls
- routed native detail surfaces instead of web modal carryover
- explicit mobile surfaces for account and favorites when those capabilities are
  part of the web product

The following current web areas are intentionally outside the mobile parity
baseline:

- `/para-centros`
- `/api/internal/pvi`
- `/internal/*`
- SEO-driven web structure
- landing-only or B2B-only surfaces

### Module Direction

The runtime now normalizes toward this tree:

```txt
src/
  app/
    _layout.tsx
    (tabs)/
      _layout.tsx
      explore/
        _layout.tsx
        index.tsx
        filters.tsx
        [activityId].tsx
      favorites/
        _layout.tsx
        index.tsx
        [activityId].tsx
      account.tsx
  features/
    catalog/
      components/
      data/
      helpers/
      hooks/
      models/
    account/
      components/
      data/
      hooks/
      models/
    favorites/
      components/
      hooks/
    shell/
      components/
  shared/
    lib/
    theme/
    ui/
```

As the app grows, keep feature code localized and shared concerns explicit. At a minimum, expect separate areas for:

- app shell and navigation
- shared UI or theme primitives
- feature modules for catalog, favorites, and account, including
  explore-scoped state, protected intents, and the account/profile surface
- configuration and environment boundaries

The current implementation already uses `shared/theme` and `shared/ui` as the
visual baseline for shell, catalog, detail, filters, and the account surface.
The parity slices should extend those areas without replacing the existing
background system.

### Data Boundary Direction

The mobile POC should not inherit the full current web domain shape by default.

For future catalog slices, use a presentation-oriented mobile contract as the default boundary:

```ts
type CatalogActivity = {
  id: string;
  title: string;
  cityId?: string;
  description?: string;
  categoryLabel?: string;
  shortDescription?: string;
  imageUrl?: string;
  cityName: string;
  centerName?: string;
  ageLabel?: string;
  scheduleLabel?: string;
  priceLabel?: string;
  venueName?: string;
  venueAddress?: string;
  isFree?: boolean;
};
```

This contract exists in code under `src/features/catalog/models/CatalogActivity.ts`.
It may grow only where the current parity pass needs real shared frontend
behavior, such as `city_id` truth for onboarding or favorites/detail reuse.

The real read-side boundary now sits one step earlier in code through
`CatalogActivityReadRow`, which mirrors the shared Supabase view
`catalog_activities_read` before the mapper reduces it into the mobile
presentation contract. The mapper now also resolves the currently observed
relative `image_url` contract into an absolute path against the shared Supabase
`activities` storage bucket.

## Decisions Already Made

- The repo will use spec-driven development as its operating model.
- Expo is the default starting point unless later repo reality or explicit user instruction overrides it.
- The native app still validates a focused family loop, but now uses
  `nenkatsu/main` as the source of truth for portable frontend parity.
- Expo Router will be used for the shell slice.
- The shell started with `Explorar` and `Cuenta`, but the active parity target
  now expects `Favoritos` as a first-class mobile surface as well.
- The visual baseline will stay intentionally thin and centered on reusable native primitives before feature slices add data.
- Catalog reads now use the shared Supabase view `catalog_activities_read` with no mock fallback.
- Detail is implemented as a route, not as a modal migration.
- `Cuenta` now mounts the product-facing auth/account/profile surface and owns
  Google/email entry, verification pending, onboarding-required, ready, and
  error states.
- `Favoritos` now exists as a first-class tab with its own list and detail
  routes.
- protected intents are persisted in the account layer and resumed once access
  becomes ready.
- The current repo baseline is pinned to Expo SDK 54 so the project can run in the default Expo Go store build on a physical phone during the current compatibility window.
- The catalog browse surface now follows a corrected web-like hierarchy in a two-column grid without fake favorite interaction.
- Relative catalog image paths are resolved against the shared Supabase public
  `activities` bucket when the backend emits the currently observed path format.
- Mobile detail contact now reads `activity_contact_options` only and follows
  the zero/one/many rule already closed in the sibling repo.
- Google plus email/password is the auth direction already closed in the sibling
  repo, and mobile should converge there where Expo/runtime config allows it.
- `user_profiles` remains the app-user truth and `city_id` remains the
  persistent city truth for mobile as well.
- Remote favorites remain mounted only on top of ready account truth.

## Decisions Explicitly Deferred

These decisions should not be invented before the app scaffold task:

- state management approach beyond local needs
- auth provider integration details beyond the current parity target
- analytics and observability stack
- final mobile contact UX once `activity_contact_options` is wired
- whether the blocked auth/favorites slices can be validated against the current
  shared backend without extra backend readiness work

## Architecture Guardrails

- Do not port a web architecture blindly into mobile.
- Keep the mobile runtime thin and reversible even while chasing parity.
- Prefer explicit seams over hidden runtime fallbacks.
- Do not mutate the global RN background while implementing parity.
- Record real decisions in `docs/DECISIONS_LOG.md`.
