# Feature Status

Last updated: 2026-04-23

| ID | Feature | Status | Notes |
| --- | --- | --- | --- |
| `000-bootstrap` | SDD foundation and repo bootstrap | Completed | Established repo operating system, docs baseline, and first planning artifacts. |
| `100-sdd-commit-policy` | Commit policy for completed slices | Completed | Formalized long-form Conventional Commit closure rules for SDD slices. |
| `007-native-family-poc` | Native family POC umbrella definition | Completed | Locked the mobile POC as a focused family loop and prepared slice `001` for execution. |
| `001-expo-navigation-shell` | Expo scaffold and navigation shell | Completed | Expo Router shell now runs with `Explorar` and `Cuenta` placeholder tabs and `src/app` routing. |
| `002-visual-system` | Visual system and tokens | Completed | Added shared typography, card, button, screen, and brand primitives on top of the Expo shell. |
| `003-catalog-read` | Public catalog proof of concept | Completed | `Explorar` now renders a mock-backed list with lean mobile cards and no detail leakage yet. |
| `004-detail-read` | Detail proof of concept | Completed | Catalog cards now open a full-screen route with facts, location, and simple external contact. |
| `005-auth-feasibility` | Auth feasibility layer | Completed | `Cuenta` now documents current anonymous state, missing inputs, and the proposed mobile auth path. |
| `006-poc-evaluation` | POC evaluation and recommendation | Completed | Final repo evaluation now states what the native POC proves, what it does not prove, and when continuation still makes sense. |
| `008-expo-go-sdk-54-compat` | Expo Go SDK 54 compatibility | Completed | Downgraded the runtime from SDK 55 to SDK 54 so the app can be opened on a physical phone with the default Expo Go store build. |
| `009-native-explore-search-filters` | Native explore search and filters demo | Completed | `Explorar` now supports native search, stable base-derived filters, empty-state recovery, and preserved context across filters and detail while keeping `Cuenta` secondary. |
| `010-demo-copy-cleanup-and-account-mock` | Product-facing copy cleanup and account mock | Completed | Routed runtime screens now use product-facing copy and `Cuenta` now mounts a static demo-friendly user mock with `Demo 5`, `USUARIO`, and fake favorites. |
| `011-compact-catalog-card-alignment` | Compact catalog card alignment | Completed | `Explorar` now uses a denser two-column grid and a compact browse card aligned more closely with the public NensGo reference while preserving current catalog behavior. |
| `012-public-card-correction` | Public card correction for native explore | Completed | `Explorar` now uses the corrected web-like card hierarchy, a local in-memory heart toggle, and a tighter header while leaving `Cuenta` unsynced and unchanged. |
| `013-card-media-aspect-fix` | Card media aspect fix | Completed | The remaining stretched-card regression is now fixed by constraining the media container and hardening grid alignment, so the corrected card content from slice `012` renders as intended. |
| `014-native-real-catalog-no-mocks` | Native real catalog baseline without mocks | Completed | `Explorar` now reads the real shared Supabase catalog, detail no longer depends on `contactPhone`, fake hearts are gone, and `Cuenta` now exposes an honest status surface instead of a fake user. |
| `015-native-catalog-image-url-hardening` | Native catalog image URL hardening | Completed | The mobile mapper now resolves the currently observed relative `image_url` format through the shared Supabase `activities` bucket, so the current real catalog rows render their actual images. |
| `016-native-detail-real-contact-options` | Native detail real contact options | Blocked | Mobile detail now reads `activity_contact_options` and implements zero/one/many contact states, but the checked shared backend still exposes only `0` active options, so real validation for `1` and `>1` remains blocked. |
| `017-native-auth-runtime-baseline` | Native auth runtime baseline | Blocked | The repo now has a real mobile auth/session provider with persisted sessions and live account states, but closure is blocked because the checked shared auth environment returned `Database error saving new user` on validation sign-up and no ready account was available to prove the full baseline. |
| `018-native-remote-favorites` | Native remote favorites | Blocked | Explore and detail now mount hearts against `user_favorite_activities` with honest gating, but round-trip validation remains blocked until `017` can be proven with a ready authenticated account. |
| `019-expo-go-supabase-auth-storage-compat` | Expo Go Supabase auth storage compatibility | Completed | Aligned AsyncStorage to the Expo SDK 54 contract and hardened Supabase client startup so missing native auth storage no longer crashes the public catalog runtime. |
| `020-native-web-parity-audit` | RN parity audit against `nenkatsu/main` | Completed | The repo now documents `nenkatsu/main` as the source of truth for portable frontend parity, records explicit web-only exclusions, and opens the traced parity implementation slices `021`-`023`. |
| `021-native-public-catalog-detail-parity` | Public catalog and detail parity against web main | Partial | Card/detail rules, shared detail core, and protected heart entry points are implemented, but real backend validation for `1` and `>1` contact states is still pending. |
| `022-native-auth-account-profile-parity` | Auth, account, and minimum profile parity against web main | Partial | Mobile now attempts Google, supports onboarding-required state, and exposes a product-grade account surface, but Google and ready-account closure still need live shared-environment validation. |
| `023-native-favorites-surface-parity` | Favorites destination and protected-intent parity | Partial | `Favoritos` tab, list, detail, and protected-intent resume are implemented, but live round-trip proof still depends on a validated ready account in the shared backend. |
