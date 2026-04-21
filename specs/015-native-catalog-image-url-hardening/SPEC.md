# 015-native-catalog-image-url-hardening SPEC

## Status

Completed on 2026-04-22

## Problem

The native catalog already reads real rows from `catalog_activities_read`, but
many real `image_url` values arrive in a relative format that the current
mobile mapper treats as unusable. As a result, many cards and detail screens
fall back to the local brand mark even when a real image exists.

## Objective

Harden the mobile image contract so catalog and detail use real media whenever
the current shared backend already exposes a resolvable asset path, while
keeping the existing fallback honest for genuinely missing or still-unresolvable
images.

## In Scope

- inspect the currently observed `image_url` formats coming from the shared
  backend
- document the observed formats inside the slice docs
- update the DB-to-mobile normalization rule for `imageUrl`
- keep `CatalogActivity.imageUrl` optional
- preserve the local brand fallback only for absent or unresolved images

## Out Of Scope

- backend or storage changes
- auth runtime
- contact options
- favorites
- speculative support for unobserved media contracts

## Constraints

- normalization must be based on observed runtime data, not invented formats
- the slice must stay a contract-hardening pass, not a storage rewrite
- fallback remains allowed only when the image is truly absent or still
  unresolved from the current contract

## Acceptance Criteria

- the mapper supports the currently observed real `image_url` format(s)
- catalog cards render the real image whenever the current contract is
  resolvable
- detail renders the real image whenever the current contract is resolvable
- the local fallback mark remains in place only for genuinely unresolved or
  missing images
- the docs record what format was observed and how it is normalized

## Done Means

This slice is done when the mobile app stops discarding resolvable real catalog
images purely because the backend currently returns them in a relative format.
