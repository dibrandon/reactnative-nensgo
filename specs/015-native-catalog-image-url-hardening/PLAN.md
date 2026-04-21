# 015-native-catalog-image-url-hardening PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-22
- Last updated: 2026-04-22
- Branch: `feat/native-real-catalog-no-mocks`
- Commit type: `fix`
- Commit scope: `catalog`
- Commit subject draft: `harden mobile catalog image url normalization`
- Spec reference: `015-native-catalog-image-url-hardening`
- Plan reference: `specs/015-native-catalog-image-url-hardening/PLAN.md`

## Context

The real mobile catalog baseline is honest, but its media rendering is still
weaker than the backend allows today because relative `image_url` values are
treated as unresolved and dropped to the fallback mark.

## Current State

- catalog and detail read real rows from `catalog_activities_read`
- the mapper keeps only absolute `http(s)` image URLs
- the current shared backend returns image paths such as
  `es/barcelona/sitges/act_5.jpg`
- the same asset is publicly reachable under the shared Supabase project
  storage path

## Goal

Normalize the observed relative image contract into a mobile-ready absolute URL
without changing the catalog presentation contract or touching unrelated slices.

## In Scope

- record the observed backend image format
- expose the minimum Supabase origin/storage helper needed for normalization
- update the catalog mapper to resolve observed relative media paths
- keep the fallback image behavior honest

## Out Of Scope

- contact options
- auth
- favorites
- backend changes

## Assumptions To Avoid

- assuming every relative image path is valid without checking the live contract
- assuming the mobile app should accept arbitrary storage buckets or unknown
  asset prefixes
- assuming the brand fallback should disappear entirely

## Touched Files

- `specs/015-native-catalog-image-url-hardening/`: slice spec and plan
- `src/shared/lib/supabase/supabaseClient.ts`: expose the shared project origin
- `src/features/catalog/data/catalogActivityMapper.ts`: normalize observed
  relative image paths into absolute URLs
- `docs/`: state, roadmap, status, debt, and decisions updates after closure

## Risks

- the observed image path contract may change again later
- over-general normalization could hide future backend drift

## Mitigations

- scope the normalization to currently observed formats only
- document the observed format and resulting rule in the slice docs and debt log

## Execution Sequence

1. inspect the real `image_url` values returned by the current backend
2. confirm the public absolute path pattern that actually resolves
3. update the mapper and shared config seam
4. validate cards and detail against real rows
5. update master docs and close the slice

## Validation

- query the shared backend for real `image_url` values
- verify the normalized URLs resolve for the current activities
- `npm run typecheck`
- `cmd /c npx expo export --platform web`

## Definition Of Done

- currently observed relative images render as real media in mobile
- fallback remains only for missing or unresolved images
- docs describe the real contract honestly

## Outcome

Completed on 2026-04-22.

The slice confirmed that the current shared backend emits relative paths such as
`es/barcelona/sitges/act_5.jpg`, and that those assets resolve publicly through
the shared Supabase `activities` storage bucket. The mobile mapper now converts
that observed relative path into a mobile-ready absolute URL, so the current
real catalog rows render their real media instead of falling back to the brand
mark.

## Follow-Ups

- reopen the rule only if the backend starts emitting additional image formats
- keep any unresolved media cases in `TECH_DEBT.md`
