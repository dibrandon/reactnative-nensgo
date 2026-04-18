# 010-demo-copy-cleanup-and-account-mock PLAN

## Metadata

- Status: In Progress
- Date opened: 2026-04-18
- Last updated: 2026-04-18
- Branch: `main`
- Commit type: `docs`
- Commit scope: `ui`
- Commit subject draft: `open slice 010 for runtime copy cleanup`
- Spec reference: `010-demo-copy-cleanup-and-account-mock`
- Plan reference: `specs/010-demo-copy-cleanup-and-account-mock/PLAN.md`

## Context

The demo runtime is functionally in a good place, but several routed screens still explain the app as a POC instead of presenting it like a product. The user wants that meta layer removed and wants `Cuenta` to become a believable static profile mock for the demo.

## Current State

Current repo reality before implementation:

- `Explorar` still contains a demo-state card and meta chips
- `Filtros` still describes itself as a simplified demo flow
- detail still includes internal rationale in the contact section
- `Cuenta` is still the auth-feasibility screen from slice `005`
- the account route imports `AccountFeasibilityScreen`
- the app still contains auth-feasibility data and helper components that may become unused after the replacement

## Goal

Make the routed runtime feel product-facing while preserving the existing behavior and replacing `Cuenta` with a static non-functional mock profile.

## In Scope

- create slice `010` spec and plan
- replace the current visible account screen with a demo user mock
- clean meta copy from `Explorar`, `Filtros`, detail, and not-found
- remove dead feasibility-only account artifacts if they are no longer used
- update repo docs and close the slice with traceable commits

## Out Of Scope

- changing search/filter logic
- adding working favorites
- adding auth or persistence
- introducing modal flows for favorites
- altering existing navigation structure

## Assumptions To Avoid

- assuming the user wants all runtime helper copy removed, including operational errors
- assuming favorites should be functional just because they look touchable
- assuming account mock data should invent new product entities outside the current catalog reality
- assuming the repo docs can keep claiming that `Cuenta` is still the visible auth-feasibility surface

## Touched Files

- `specs/010-demo-copy-cleanup-and-account-mock/`: slice spec and plan
- `src/features/account/`: account screen replacement and any now-unused account artifacts
- `src/features/catalog/components/`: visible copy cleanup in explore, filters, and detail
- `src/app/+not-found.tsx`: simplify fallback copy
- `docs/`: state, architecture, roadmap, feature status, and decisions updates at closure

## Risks

- removing too much copy could make the app feel sparse instead of product-facing
- account favorites could accidentally imply functionality that does not exist
- stale account feasibility files could remain in the repo and confuse future work

## Mitigations

- keep short functional copy where it helps comprehension
- style favorites as touch-like rows but keep behavior intentionally inert
- remove or rewrite now-unused feasibility-only artifacts once the new account screen lands

## Execution Sequence

1. open slice `010` in spec, plan, and repo status docs
2. replace the visible account screen with the static demo user mock
3. clean meta copy from explore, filters, detail, and not-found
4. remove dead account feasibility artifacts if they are no longer referenced
5. run validation, update docs, and close the slice with traceable commits

## Validation

- run `npm.cmd run typecheck`
- run `cmd /c npx expo export --platform web`
- manually inspect the routed runtime surfaces for:
  - removal of meta/demo/POC explanatory copy
  - `Demo 5` badge in `Cuenta`
  - static favorites rows that stay non-functional

## Definition Of Done

- routed runtime screens read like product surfaces instead of internal demo notes
- `Cuenta` shows the static `USUARIO` mock with `Sitges` and fake favorites
- the only remaining meta badge in runtime is `Demo 5`
- dead feasibility-only account artifacts are removed or rewritten
- docs and git history reflect the new slice honestly

## Outcome

Slice opened on 2026-04-18. Implementation is in progress.

## Follow-Ups

- after the demo, decide whether `Cuenta` should stay mock-only or reopen a product decision about real account value
- keep any future auth work grounded in repo docs rather than reintroducing visible meta explanation into the runtime
