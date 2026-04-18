# 011-compact-catalog-card-alignment SPEC

## Status

In Progress

## Problem

The current native catalog cards are still too tall and list-like for the demo. They do not match the denser public NensGo reference closely enough, and `Explorar` does not currently show the compact multi-card scanning behavior that families should feel on a phone.

## Objective

Refine the mobile catalog card and list composition so `Explorar` reads more like the public NensGo browsing surface: compact cards, denser scanning, and roughly four visible cards in two rows on a typical phone screen.

## In Scope

- create slice `011` spec and plan artifacts
- use the public NensGo dev site as a visual reference for the compact public card direction
- reduce catalog card height through tighter media ratio, copy, pills, and CTA treatment
- change the catalog list composition to a denser mobile grid
- keep the current search, filter, and detail navigation behavior intact
- update repo docs so the new demo-facing card density is reflected honestly

## Out Of Scope

- changing the `CatalogActivity` contract
- changing search or filter logic
- changing detail content or account surfaces
- introducing backend reads, persistence, or favorites behavior
- attempting pixel-perfect web parity

## Constraints

- treat the public web card as a reference, not as a route-for-route migration target
- preserve readable tap targets and title legibility on phone screens
- keep the implementation scoped to catalog presentation, not catalog behavior
- prefer a two-column mobile-first grid over a long single-column list

## Acceptance Criteria

- `Explorar` renders catalog cards in a denser grid instead of a wide single-column stack
- card media and content are visibly more compact than the previous implementation
- a user can scan roughly four cards at once across two rows on a typical phone screen
- cards still open detail with the current navigation flow
- search, filters, empty state, and counts remain intact

## Done Means

This slice is done when the catalog surface feels visually closer to the public NensGo browsing reference and the demo supports faster mobile scanning without changing underlying catalog behavior.
