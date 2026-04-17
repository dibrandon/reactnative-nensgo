# 002-visual-system SPEC

## Status

Completed on 2026-04-17

## Problem

The Expo shell now runs, but its visuals still depend on a narrow set of placeholder-specific styles. Before adding catalog and detail surfaces, the app needs a reusable visual baseline so the POC does not become a pile of one-off screen styles.

## Objective

Establish the minimum shared visual system for the native POC so the shell, upcoming catalog, and detail slices can share intentional layout, typography, surface, and action patterns.

## In Scope

- load a project font fit for the NensGo tone
- consolidate theme tokens for color, spacing, radii, and typography
- add minimum reusable UI primitives for screens, cards, labels, and buttons
- add a reusable brand lockup for the app shell
- refactor the existing shell screens to use the shared visual layer

## Out Of Scope

- catalog data or card behavior
- detail route implementation
- auth logic
- a full design system with every possible component
- dark mode
- animation polish beyond what is needed for baseline coherence

## Constraints

- keep the visual system intentionally small and reusable
- stay aligned with NensGo tone without copying the web landing composition
- avoid introducing product behavior while working on presentation
- leave the next catalog slice able to consume the shared primitives directly

## Acceptance Criteria

- the shell no longer depends on ad hoc placeholder-only styling
- typography, surface, and CTA patterns are shared through the visual layer
- `Explorar` and `Cuenta` keep their current shell scope while looking more intentional
- the visual baseline is strong enough for catalog and detail to build on next

## Done Means

This slice is done when the app has a small but real native visual system that makes the shell feel like the start of a product rather than a template plus inline styling.
