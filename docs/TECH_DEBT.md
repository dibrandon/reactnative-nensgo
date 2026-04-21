# Tech Debt

Last updated: 2026-04-22

## Current Debt Reality

The repository now has runnable Expo code, so debt tracking is no longer theoretical. Current debt is still acceptable for a POC, but it is real and should remain explicit.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is intentionally thin and still biased toward shell, catalog, detail, filters, and the current account status surface only.
- Mobile auth runtime now exists, but the checked shared auth environment still
  blocks closure because validation sign-up returned `Database error saving new
  user` and no ready account was available to prove the full baseline.
- Remote favorites are now wired against the real backend, but closure is still
  blocked behind auth readiness and the absence of a validated ready account.
- Detail contact now reads `activity_contact_options`, but the checked shared
  data still exposes `0` active rows, so the real `1` and `>1` option states
  remain unvalidated.
- The repo is currently pinned to Expo SDK 54 for Expo Go convenience on phones; upgrading again should wait until Expo Go store support and the project's real runtime needs align.
- Explore search and filters are intentionally in-memory only; if the demo evolves into a real product, persistence and restoration policy still need to be designed.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
