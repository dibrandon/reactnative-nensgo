# 007-native-family-poc SPEC

## Status

Completed on 2026-04-17

## Problem

The repository had a generic React Native roadmap, but it did not yet define what part of the current NensGo product should be validated natively. Without that umbrella scope, the mobile effort could easily drift into a web migration, a fake full product, or an oversized domain model before the first shell even exists.

## Objective

Define the native-first NensGo POC as a focused family-facing exploration that validates whether the core discovery experience works well as a mobile app.

## In Scope

- define the native POC goal around the family discovery loop
- define explicit exclusions so the POC does not become web parity work
- document the mobile interpretation of the current web behavior
- lock a lean mobile `CatalogActivity` boundary for later catalog slices
- define the phased slice sequence for the POC
- prepare the first executable slice as `001-expo-navigation-shell`

## Out Of Scope

- implementing the Expo app runtime
- implementing catalog screens
- implementing cards or detail UI
- implementing auth, favorites, or protected actions
- migrating `/para-centros`
- migrating `/pvi`
- admin or internal surfaces
- SEO or web distribution concerns

## Mobile Interpretation Of NensGo

This POC should interpret the current product like this:

- a short native shell instead of a long editorial landing
- an `Explorar` entry point for the family-facing catalog journey
- a full-screen detail route later instead of a modal port
- an early visible `Cuenta` surface that represents future auth without pretending it already exists

## Lean Mobile Contract

Later catalog slices should start from this boundary:

```ts
type CatalogActivity = {
  id: string;
  title: string;
  categoryLabel?: string;
  shortDescription?: string;
  imageUrl?: string;
  cityName: string;
  centerName?: string;
  ageLabel?: string;
  scheduleLabel?: string;
  priceLabel?: string;
  venueName?: string;
  venueAddress?: string;
  isFree?: boolean;
  contactPhone?: string;
};
```

This is a presentation-oriented POC contract, not a mirror of the current web/domain model.

Do not add raw web-heavy fields such as:

- numeric foreign keys
- slugs and timestamps
- auth metadata
- analytics fields
- full center or city entities
- raw age-rule enums

If a later slice needs more fields, that slice must justify the expansion in its own spec and plan.

## Slice Sequence Under This Umbrella

1. `001-expo-navigation-shell`
2. `002-visual-system`
3. `003-catalog-read`
4. `004-detail-read`
5. `005-auth-feasibility`
6. `006-poc-evaluation`

## Acceptance Criteria

- the umbrella scope is explicit and does not read like a web migration brief
- the native interpretation of the product is documented
- the lean mobile contract is defined and bounded
- the next executable slice is clearly `001-expo-navigation-shell`
- repo docs reflect the focused family-loop direction

## Done Means

This slice is done when a future implementer can start the first native shell without needing to guess what the POC is trying to validate, what is out of scope, or how large the mobile data boundary should be.
