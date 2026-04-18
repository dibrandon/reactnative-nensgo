# 010-demo-copy-cleanup-and-account-mock SPEC

## Status

In Progress

## Problem

The visible runtime still exposes internal or meta explanatory copy across routed screens. That weakens the demo because parts of the app read like a POC report instead of a product surface. `Cuenta` is the clearest example: it still behaves like an auth-feasibility explainer instead of a believable user-facing screen.

## Objective

Remove internal/meta explanatory copy from routed runtime surfaces and replace `Cuenta` with a static demo-friendly user mock.

## In Scope

- create slice `010` spec and plan artifacts
- remove meta/demo/POC narration from routed runtime screens
- replace the visible `Cuenta` runtime with a static mock user profile
- keep the top account badge but rename it from `Slice 005` to `Demo 5`
- use real activity titles from the current catalog mock as fake favorites
- update repo docs so they reflect the new product-facing runtime tone

## Out Of Scope

- changing catalog search or filter behavior
- adding working favorites or account persistence
- implementing auth
- adding modal behavior to the favorites rows
- changing the catalog or account data contracts beyond this demo mock

## Constraints

- keep only product-facing or operational runtime copy
- remove visible references to POC, slice rationale, feasibility, validation, and mock provenance
- treat favorites as static demo rows only
- keep the existing routed flow and navigation behavior intact

## Acceptance Criteria

- `Explorar` no longer shows the `Estado honesto del demo` card or meta chips
- `Filtros`, detail, and not-found read like product/runtime screens instead of internal explanation surfaces
- `Cuenta` shows `USUARIO`, `Sitges`, and three fake favorites in touch-like framed rows
- the only remaining meta-style badge in the runtime is the account badge renamed to `Demo 5`
- no dead auth-feasibility artifacts remain if they are no longer referenced

## Done Means

This slice is done when the user-facing runtime looks like a believable demo app instead of an internal proof-of-concept narration layer, while keeping the current behavior and data flow intact.
