# 004-detail-read SPEC

## Status

Completed on 2026-04-17

## Problem

The catalog list now proves that families can scan activities in a native shell, but the POC still cannot validate the next critical question: whether opening a focused full-screen detail feels natural on mobile and gives enough context to justify a contact action.

## Objective

Add a dedicated native detail route that opens from the catalog, presents the minimum useful activity information, and exposes a simple external contact CTA without importing favorites or full auth behavior.

## In Scope

- add a dedicated detail route under `explore`
- add a route-level detail screen backed by the existing catalog seam
- support loading, error, and not-found states for detail reads
- add a full-screen detail layout with hero image, key facts, location, and contact section
- add a simple external contact CTA based on the existing mock contact phone
- wire catalog cards into the detail route

## Out Of Scope

- favorites
- profile or auth logic
- analytics
- remote data fetching
- complex inquiry forms
- modal presentation parity with the web

## Constraints

- keep detail full-screen and native-first, not a web modal port
- reuse the lean `CatalogActivity` contract unless a concrete detail need forces expansion
- keep contact external and simple
- do not let this slice absorb favorites, filters, or account behavior

## Acceptance Criteria

- tapping a catalog card opens a dedicated detail route
- the detail route shows enough information to evaluate the activity at a basic level
- the detail CTA opens an external contact target when contact data exists
- missing or invalid ids show an honest not-found state
- no favorites or auth-protected behavior appears in the detail flow

## Done Means

This slice is done when the catalog no longer dead-ends at the card level and the app can demonstrate a coherent mobile path from discovery to a simple external contact handoff.
