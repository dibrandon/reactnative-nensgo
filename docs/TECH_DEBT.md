# Tech Debt

Last updated: 2026-04-17

## Current Debt Reality

The repository now has runnable Expo code, so debt tracking is no longer theoretical. Current debt is still acceptable for a POC, but it is real and should remain explicit.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is intentionally thin and still biased toward shell, catalog, and detail surfaces only.
- No backend contract or auth contract is documented.
- Catalog data is still a curated in-repo mock set, so freshness and backend parity are intentionally unresolved.
- Catalog images are copied into the repo for the curated mock set and are not yet optimized as a production asset pipeline.
- `Cuenta` is a visible placeholder only; no auth viability work has started yet.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
