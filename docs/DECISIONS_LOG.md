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
