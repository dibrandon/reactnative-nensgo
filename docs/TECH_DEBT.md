# Tech Debt

Last updated: 2026-04-23

## Current Debt Reality

The repository now has runnable Expo code, so debt tracking is no longer theoretical. Current debt is still acceptable for a POC, but it is real and should remain explicit.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is intentionally thin and still biased toward shell, catalog, detail, filters, and the current account status surface only.
- The repo has formally moved into a parity pass against `nenkatsu/main`, but
  the mobile runtime still lacks the first-class account, onboarding, and
  favorites surfaces that the web frontend already exposes.
- Mobile auth runtime now exists, but the checked shared auth environment still
  blocks closure because validation sign-up returned `Database error saving new
  user` and no ready account was available to prove the full baseline.
- Google OAuth parity is still absent in mobile runtime, even though the web
  frontend now treats Google plus email/password as the active auth direction.
- Mobile onboarding still cannot complete `ensure_my_profile(...)`, so
  `user_profiles` readiness and `city_id` truth are not yet closed in-product.
- Mobile auth persistence now degrades safely if native AsyncStorage is
  unavailable, which protects the public catalog runtime but still means auth
  restore should be considered environment-dependent until validated on the
  exact Expo Go/device target in manual smoke.
- Remote favorites are now wired against the real backend, but closure is still
  blocked behind auth readiness and the absence of a validated ready account.
- Remote favorites still lack a dedicated mobile destination and detail route,
  so the repo has the backend seam without the full frontend surface parity yet.
- Detail contact now reads `activity_contact_options`, but the checked shared
  data still exposes `0` active rows, so the real `1` and `>1` option states
  remain unvalidated.
- Public-surface hardening has not yet fully reached the mobile runtime:
  Explore, Filters, detail, and `Cuenta` still expose copy that reads more like
  implementation status than product UI.
- The repo is currently pinned to Expo SDK 54 for Expo Go convenience on phones; upgrading again should wait until Expo Go store support and the project's real runtime needs align.
- Explore search and filters are intentionally in-memory only; if the demo evolves into a real product, persistence and restoration policy still need to be designed.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
