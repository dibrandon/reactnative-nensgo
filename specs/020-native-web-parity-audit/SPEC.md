# 020-native-web-parity-audit SPEC

## Status

Completed on 2026-04-23

## Problem

The React Native repo already moved important runtime seams to real shared
contracts, but its docs and roadmap still describe a deliberately narrow POC
that explicitly stops short of parity with the current web frontend. The web
repo `nenkatsu/main` has since become the real product/frontend source of
truth for catalog, detail, auth/profile, favorites, and public-surface
hardening decisions.

Without a parity audit, the mobile repo would risk drifting in three directions
at once:

- carrying stale documentation about what mobile is trying to prove
- reopening older blocked slices without a coherent new program
- porting web-only surfaces blindly instead of documenting exclusions

## Objective

Document a parity-first execution baseline for mobile against
`D:\dev\nensGo\nenkatsu` `main`, explicitly classify portable vs non-portable
web surfaces, and open the traced follow-up slices needed to implement mobile
frontend parity without touching the global RN background.

## In Scope

- inspect the current checked-out `nenkatsu/main` frontend and docs as the
  source of truth
- build a parity matrix that maps web surfaces to current RN state
- classify each surface as:
  - `port now`
  - `document only`
  - `intentionally not portable`
- update RN master docs and roadmap to reflect the parity program
- create the traced SDD artifacts for the parity implementation slices
- record the non-negotiable visual rule that the global RN background stays as-is

## Out Of Scope

- runtime implementation changes
- backend or SQL changes
- mutations in `nenkatsu`
- mutations in `landingb2b`, `docs-internos-ale`, `db`, or `images`

## Constraints

- `nenkatsu/main` is the functional/documental source of truth for portable
  frontend behavior
- the RN global background logic must not change
- parity does not mean porting web-only marketing, internal, SEO, or reporting
  surfaces
- older blocked slices `016`-`018` remain historical truth and cannot be
  rewritten as if they never happened

## Acceptance Criteria

- RN docs explicitly state that mobile parity is now evaluated against
  `nenkatsu/main` where mobile portability makes sense
- the parity matrix and exclusions are captured in repo-tracked artifacts
- the roadmap names the new parity slices instead of describing web parity as
  out of scope
- the non-portable web surfaces are documented explicitly
- the RN background exception is recorded explicitly

## Done Means

This slice is done when the repo has a documented parity program, the relevant
RN docs reflect that new direction honestly, and the follow-up implementation
slices are opened with enough detail to execute without re-planning.
