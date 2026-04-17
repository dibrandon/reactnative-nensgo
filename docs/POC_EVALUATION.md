# Native POC Evaluation

Last updated: 2026-04-17

## Verdict

The native POC is strong enough to justify a second round of work only if the intended mobile product stays narrow: family discovery, native detail, simple external contact, and a lightweight account/auth direction.

If the real goal is full web parity, admin flows, or a heavy auth-dependent product in the near term, this is the wrong base to continue from without a new scope decision.

## What The POC Proves

- A native-first interpretation of NensGo works better than a literal web port for the core family loop.
- `Explorar -> card -> full-screen detail -> external contact` is coherent in Expo Router and feels structurally app-like.
- The lean `CatalogActivity` contract is enough for the current discovery loop and avoids dragging the full web model into native.
- The shared visual baseline is sufficient to support shell, catalog, detail, and account feasibility surfaces without obvious UI churn.
- `Cuenta` can carry useful technical meaning in the POC without faking login.

## What The POC Does Not Prove

- It does not prove remote catalog integration, data freshness, or backend viability.
- It does not prove real mobile auth, token handling, redirect configuration, or session persistence.
- It does not prove favorites, protected actions, profile editing, analytics, or push notification value.
- It does not prove production readiness, QA readiness, or asset pipeline maturity.
- It does not prove that web-only surfaces such as `/para-centros`, `/pvi`, or admin features belong in mobile.

## Current Gaps

- Catalog data is still a curated in-repo mock set.
- Auth is still a feasibility layer, not a working runtime.
- Contact is a simple external WhatsApp handoff with no analytics or fallback policy.
- There is still no lint, test, or CI baseline.
- App icons and image handling are still POC-grade.

## Recommendation

Continue only if the next phase stays focused on a small mobile product:

1. Replace mock catalog data with a real adapter-backed read path.
2. Decide whether mobile actually needs protected actions before wiring auth.
3. Add a quality baseline: lint, tests, CI, and asset cleanup.

Do not continue by chasing web parity feature-by-feature. If the roadmap shifts toward admin, SEO-like structure, or immediate full auth complexity, re-scope first instead of extending this POC directly.

## Next Decision

Two sensible paths remain:

- Continue: treat this repo as the base for a narrow browse/detail/contact app and open a new production-oriented roadmap.
- Stop here: keep this repo as a validated reference showing that the native family loop is viable, while acknowledging that backend and auth cost remain open.
