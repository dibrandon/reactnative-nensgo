# 013-card-media-aspect-fix SPEC

## Status

Completed on 2026-04-18

## Problem

The corrected browse card from slice `012` still renders as vertically stretched on the current native/web preview. The content hierarchy is present in code, but the media block is not being constrained reliably, so the image keeps its natural aspect and pushes the rest of the card out of view.

## Objective

Fix the card media sizing so the browse card respects the intended `4:3` block consistently and the card content becomes visible without changing the current card hierarchy or feature scope.

## In Scope

- create slice `013` spec and plan artifacts
- move the effective `4:3` constraint from the image behavior to the media container
- make the image fill the constrained media container instead of sizing itself from intrinsic dimensions
- harden the grid item alignment so wrapped rows do not stretch cards unexpectedly
- update repo docs to reflect the correction honestly

## Out Of Scope

- changing the browse hierarchy introduced in slice `012`
- changing search, filters, detail flow, or the heart behavior
- changing `Cuenta`
- persistence or sync for favorites

## Constraints

- keep the card hierarchy from slice `012`
- keep the heart local to the explore stack
- keep `resizeMode="cover"`
- fix the regression through a new slice rather than rewriting prior slice history

## Acceptance Criteria

- the first row of cards no longer renders as tall image blocks
- the card content becomes visible directly under the media block
- the media block behaves as a stable `4:3` area in the current preview
- search, filters, detail, and heart behavior remain intact

## Done Means

This slice is done when the card media no longer stretches vertically in the current preview and the corrected browse card from slice `012` finally renders as intended.
