# 012-public-card-correction SPEC

## Status

Completed on 2026-04-18

## Problem

The current native browse card regressed after the previous compaction pass. In the current runtime, the image dominates too much of the card, the information hierarchy no longer matches the public web reference, and `Explorar` still spends too much vertical space before the first row of cards appears.

## Objective

Correct the native catalog card so it follows the public web hierarchy more closely and tighten the `Explorar` header so the browse surface appears earlier in the initial viewport.

## In Scope

- create slice `012` spec and plan artifacts
- rebuild the native catalog card around the web-like hierarchy
- add a local in-memory favorite toggle to the card heart
- keep favorites scoped to the existing explore-local state only
- tighten the `Explorar` header without changing search, filters, counts, or empty-state logic
- update repo docs so the corrected browse reality is documented honestly

## Out Of Scope

- changing `CatalogActivity`
- syncing favorites into `Cuenta`
- persisting favorites between app restarts
- backend, auth, or account behavior changes
- changing detail content beyond preserving current return-state behavior
- rewriting slice `011` history

## Constraints

- the supplied screenshots are the source of truth for the correction
- the heart is a demo-local toggle only
- the card must keep `4:3` media and `cover` image treatment
- the card must restore a full-width bottom CTA
- the correction must preserve the existing search, filters, and detail flow

## Acceptance Criteria

- the first row of cards no longer reads as stretched image blocks
- each card shows image, optional `Gratis`, heart, category, title, age, center, city, and full-width `Ver más`
- tapping the heart toggles local favorite state without opening detail
- favorite state remains visible after returning from detail while the explore stack stays mounted
- `Explorar` header is visibly shorter and cards surface earlier in the first viewport

## Done Means

This slice is done when the native browse card feels structurally aligned with the supplied web reference, the header is tighter, and the current runtime behavior stays intact outside the new local heart toggle.
