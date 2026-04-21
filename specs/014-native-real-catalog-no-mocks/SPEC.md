# 014-native-real-catalog-no-mocks SPEC

## Status

Completed on 2026-04-21

## Problem

The native app still depends on mock catalog data, fake favorites, a fake
account surface, and a detail contact path driven by `contactPhone`. That
runtime is no longer honest now that the shared backend already exposes a real
catalog read model.

## Objective

Replace the mock-backed mobile catalog runtime with a real Supabase-backed
baseline that reads from `public.catalog_activities_read`, keeps the current
explore and detail flow working on real data, and removes fake runtime behavior
that is not actually implemented.

## In Scope

- add the minimum mobile Supabase client for public catalog reads
- define a remote read-row contract aligned with `catalog_activities_read`
- map the remote read row into the lean mobile `CatalogActivity` contract
- replace the mock catalog repository with a real repository
- keep search and filters working on the loaded real catalog
- keep detail working on real activity data without `contactPhone`
- replace the fake account surface with an honest status screen
- remove fake favorites affordances from the explore runtime
- update the SDD docs to reflect the new honest baseline

## Out Of Scope

- real auth runtime
- Google sign-in
- email/password
- session persistence
- onboarding or profile provisioning through `ensure_my_profile(...)`
- remote favorites
- analytics or PVI
- real contact options integration through `activity_contact_options`
- backend or SQL changes

## Constraints

- no runtime fallback to mocks
- no fake user, fake favorites, or fake contact behavior
- `contactPhone` must stop governing detail behavior
- the mobile runtime must align with the shared backend direction already closed
  in the sibling repo
- errors, loading, empty states, and "not implemented yet" states are allowed if
  they are honest

## Acceptance Criteria

- `Explorar` reads the catalog from Supabase through `catalog_activities_read`
- no runtime path uses `catalogActivityMocks` or `mockCatalogRepository`
- search and filters operate on real loaded activities
- detail renders real activity data without depending on `contactPhone`
- the contact section is honest and non-fake if real contact options are still
  out of scope
- `Cuenta` no longer shows a fake person or fake saved activities
- fake favorite interaction is removed from the explore runtime

## Done Means

This slice is done when the mobile app stops pretending that mocks, fake
favorites, fake account data, and fake contact are real product behavior, while
still compiling and running against a real Supabase-backed catalog.
