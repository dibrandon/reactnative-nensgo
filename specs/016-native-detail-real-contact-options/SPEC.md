# 016-native-detail-real-contact-options SPEC

## Status

Blocked on 2026-04-22

## Problem

The mobile detail screen now renders real catalog data, but its primary action
is still a non-operational placeholder. The shared product direction already
closed contact truth around `activity_contact_options`, so the mobile detail
still lacks the real action seam that the sibling repo already adopted.

## Objective

Connect `activity_contact_options` into the native detail flow so the detail can
offer real contact actions per activity without reintroducing `contactPhone`,
center-level fallback, or any fake contact source.

## In Scope

- add a mobile contact-option boundary for detail
- read `activity_contact_options` by `activity_id`
- include only active, non-deleted options
- implement the inherited runtime rule:
  - one option => direct action
  - multiple options => chooser surface
  - zero options => honest disabled state
- keep the detail aligned with the existing real catalog contract

## Out Of Scope

- center-level fallback contact
- hardcoded WhatsApp numbers
- auth
- favorites
- backend or SQL changes
- fake test data in runtime

## Constraints

- `CatalogActivity` must stay free of `contactPhone`
- the contact source must remain `activity_contact_options` only
- the slice cannot be marked done without real validation for the three intended
  states: `0`, `1`, and `>1` active options

## Acceptance Criteria

- the detail screen reads `activity_contact_options` for the current activity
- zero options render an honest disabled state
- one option triggers its direct action
- multiple options open a chooser and execute the selected action
- no runtime path falls back to center contact or a fixed WhatsApp number

## Done Means

This slice is done only when mobile contact behavior is wired to
`activity_contact_options` and all three runtime states have been validated with
real backend data.
