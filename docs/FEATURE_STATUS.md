# Feature Status

Last updated: 2026-04-18

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
