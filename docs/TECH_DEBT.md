# Tech Debt

Last updated: 2026-04-18

## Current Debt Reality

The repository now has runnable Expo code, so debt tracking is no longer theoretical. Current debt is still acceptable for a POC, but it is real and should remain explicit.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is intentionally thin and still biased toward shell, catalog, detail, filters, and the current account mock only.
- No backend contract or executable auth runtime contract is documented yet.
- Catalog data is still a curated in-repo mock set, so freshness and backend parity are intentionally unresolved.
- Catalog images are copied into the repo for the curated mock set and are not yet optimized as a production asset pipeline.
- Detail contact uses a simple external WhatsApp handoff and has no analytics, fallback contact channels, or deep-link policy yet.
- Real mobile auth runtime, credentials, and redirect policy are still absent.
- The repo is currently pinned to Expo SDK 54 for Expo Go convenience on phones; upgrading again should wait until Expo Go store support and the project's real runtime needs align.
- Explore search and filters are intentionally in-memory only; if the demo evolves into a real product, persistence and restoration policy still need to be designed.
- `Cuenta` is now a static demo mock with fake favorites, so the product meaning of account and saved activities still needs a real decision before any runtime implementation.
- The catalog heart now toggles in explore-local memory only and is intentionally unsynced with `Cuenta`, so the real meaning of favorites still remains unresolved.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
