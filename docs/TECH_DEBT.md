# Tech Debt

Last updated: 2026-04-21

## Current Debt Reality

The repository now has runnable Expo code, so debt tracking is no longer theoretical. Current debt is still acceptable for a POC, but it is real and should remain explicit.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is intentionally thin and still biased toward shell, catalog, detail, filters, and the current account status surface only.
- Mobile auth runtime, session persistence, and redirect policy are still absent.
- Remote favorites are still absent; the fake local heart has been removed rather than replaced.
- Detail contact is now intentionally non-operational until `activity_contact_options` is wired for mobile.
- The real catalog `image_url` values currently arrive in a relative format that is not mobile-ready, so many activities fall back to the local brand image until the contract exposes absolute URLs or another stable mobile asset path.
- The repo is currently pinned to Expo SDK 54 for Expo Go convenience on phones; upgrading again should wait until Expo Go store support and the project's real runtime needs align.
- Explore search and filters are intentionally in-memory only; if the demo evolves into a real product, persistence and restoration policy still need to be designed.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
