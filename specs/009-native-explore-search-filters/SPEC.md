# 009-native-explore-search-filters SPEC

## Status

Completed on 2026-04-18

## Problem

The native POC already proves that `Explorar -> detail -> external contact` works structurally, but tomorrow's demo still leans too much on a static list. It does not yet show the stronger mobile value proposition for NensGo: opening the app, narrowing the catalog quickly, and returning through the flow without losing context.

## Objective

Turn `Explorar` into a demo-ready native discovery loop with search, filters, stable back behavior, and preserved state across `Explorar`, `Filtros`, and detail.

## In Scope

- add a focused demo slice centered on `Explorar + buscar + filtrar`
- add shared explore state for search and applied filters
- add pure search and filter selectors sized to the current mock dataset
- add a dedicated full-screen filters route inside the existing explore stack
- update `Explorar` to show search, active filters, result counts, empty state, and reset actions
- keep detail reachable while preserving explore state on return
- document the demo scope, validation, and repo reality changes

## Out Of Scope

- auth behavior or account redesign
- favorites
- backend integration
- maps, analytics, or notifications
- expanding the `CatalogActivity` contract
- adding a fourth filter dimension not supported cleanly by the mock data
- turning detail into the main demo story

## Constraints

- keep the filter set intentionally narrow: `city`, `category`, and `ageBand`
- keep search separate from active filter counting
- derive filter options from the full normalized dataset, not from filtered results
- normalize age through helpers and selectors only, not by mutating the mock dataset
- preserve native-feeling back behavior with a safe fallback to `/explore`
- keep `Cuenta` visible but secondary

## Acceptance Criteria

- `Explorar` shows a visible search input, `Filtros` action, result summary, and filter state
- typing search updates the visible result list immediately
- the filters screen works as a draft flow and only applies changes on `Aplicar`
- `Explorar` preserves search and filters when navigating to filters and detail and then returning
- empty results show a clear recovery path through `Mostrar todo`
- detail still works, but the main demo narrative is now catalog narrowing rather than detail depth

## Done Means

This slice is done when the app can credibly demonstrate the core native discovery loop for NensGo: open the app, browse activities, search, filter, and go back without losing context.
