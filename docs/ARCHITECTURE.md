# Architecture

## Current Implemented Architecture

As of 2026-04-18, the implemented architecture contains a runnable Expo shell, a thin shared visual system, a mock-backed catalog feature module, explore-scoped search and filters, a full-screen detail route, a static account mock surface, and the repo SDD documents.

The repository currently contains:

- SDD operating documents
- Expo SDK 54 runtime dependencies
- `src/app` driven by Expo Router
- a catalog-backed `Explorar` tab plus a static mock `Cuenta` tab
- stack-scoped explore state for search, filters, counts, and result derivation
- shared theme tokens plus typography primitives
- reusable `src/shared/ui` building blocks for text, buttons, surfaces, pills, brand lockup, and screen framing
- shell-specific placeholder composition built on the shared visual layer
- `src/features/catalog` with a lean runtime model, curated mocks, image mapping, repository seam, hook, a corrected web-like browse card hierarchy, and a local explore-scoped heart toggle
- a dedicated detail route under `src/app/(tabs)/explore/[activityId].tsx`
- a dedicated filters route under `src/app/(tabs)/explore/filters.tsx`
- `src/features/account` with a static demo profile model and account surface for the `Cuenta` tab

## Provisional Target Architecture For The POC

This is a target direction, not implemented reality.

### Platform Direction

- Expo-managed React Native project
- TypeScript-first setup
- Expo Router for app shell navigation
- mock-friendly boundaries so the POC does not depend on backend completion

### Architectural Layers

The POC should evolve in thin layers:

1. app scaffold and navigation shell
2. shared visual primitives and tokens
3. feature slices for catalog and detail
4. feasibility layer for auth-related integration
5. evaluation artifacts for whether the POC should continue

### Product Interpretation For Mobile

The mobile POC is not a route-for-route copy of the current web experience.

The intended native interpretation is:

- a focused family loop centered on discovering activities
- a short, app-like `Explorar` entry point instead of a long editorial landing
- a full-screen filters route with draft application semantics instead of dense in-list web controls
- a full-screen detail route instead of a modal detail overlay
- an early visible `Cuenta` surface as a static user mock, not real auth

The following current web areas are intentionally outside the native POC baseline:

- `/para-centros`
- `/pvi`
- admin or internal surfaces
- SEO-driven web structure
- parity with current web filters, favorites, and protected actions

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
      models/
    shell/
      components/
  shared/
    theme/
    ui/
```

As the app grows, keep feature code localized and shared concerns explicit. At a minimum, expect separate areas for:

- app shell and navigation
- shared UI or theme primitives
- feature modules for catalog and account, including explore-scoped state and the static account mock
- mock data or adapters only when a slice actually needs them
- configuration and environment boundaries

The current implementation already uses `shared/theme` and `shared/ui` as the visual baseline for shell, catalog, detail, filters, and the account mock screen. The next slices should extend those areas only when a future iteration truly needs more surface area.

### Data Boundary Direction

The mobile POC should not inherit the full current web domain shape by default.

For future catalog slices, use a presentation-oriented mobile contract as the default boundary:

```ts
type CatalogActivity = {
  id: string;
  title: string;
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
  contactPhone?: string;
};
```

This contract now exists in code under `src/features/catalog/models/CatalogActivity.ts`.
Do not expand it into a mirror of the current web model unless a later slice proves the extra fields are necessary.

## Decisions Already Made

- The repo will use spec-driven development as its operating model.
- Expo is the default starting point unless later repo reality or explicit user instruction overrides it.
- The native POC will validate a focused family loop instead of web parity.
- Expo Router will be used for the shell slice.
- The first native shell will expose `Explorar` and `Cuenta` tabs.
- The visual baseline will stay intentionally thin and centered on reusable native primitives before feature slices add data.
- Catalog reads will use curated mobile mocks before any backend or full web-model parity work is considered.
- Detail is implemented as a route, not as a modal migration.
- `Cuenta` currently mounts a static demo user mock while real auth remains outside the runtime.
- The current repo baseline is pinned to Expo SDK 54 so the project can run in the default Expo Go store build on a physical phone during the current compatibility window.
- The catalog browse surface now follows a corrected web-like hierarchy in a two-column grid, with the heart toggle stored only in the explore-local state layer.

## Decisions Explicitly Deferred

These decisions should not be invented before the app scaffold task:

- state management approach beyond local needs
- backend data access strategy
- auth provider integration details
- analytics and observability stack

## Architecture Guardrails

- Do not port a web architecture blindly into mobile.
- Keep the POC thin and reversible.
- Prefer seams and mocks over premature backend coupling.
- Record real decisions in `docs/DECISIONS_LOG.md`.
