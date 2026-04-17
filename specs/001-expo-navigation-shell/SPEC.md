# 001-expo-navigation-shell SPEC

## Status

Planned on 2026-04-17

## Problem

The repository still has no runtime application. Before testing catalog, detail, or auth viability, the project needs a narrow first slice that proves a native shell can boot, navigate, and present NensGo-inspired placeholders without pulling in broader product behavior too early.

## Objective

Create the first runnable Expo-based mobile shell for the NensGo native POC.

## In Scope

- Expo scaffold
- TypeScript baseline
- Expo Router setup
- safe area handling
- `Explorar` and `Cuenta` tabs
- shell-only NensGo-inspired styling
- placeholder content for both tabs
- cleanup of irrelevant template demo screens and sample copy

## Out Of Scope

- real catalog list
- activity cards
- detail route implementation
- mock repository or mock data files
- auth integration
- favorites
- search and filters
- Supabase wiring

## Constraints

- use Expo SDK 55
- use Expo Router for the shell
- scaffold into a temporary directory first because the repo already contains docs and specs
- use `npm.cmd` or `cmd /c npx ...` in this environment instead of plain `npm`
- keep the shell intentionally thin so later slices can add catalog, detail, and auth in order

## Acceptance Criteria

- the app boots as an Expo project
- tabs for `Explorar` and `Cuenta` are visible and reachable
- both tabs render placeholder content without backend or Supabase config
- the shell feels branded toward NensGo without copying the web landing structure
- no catalog, detail, or auth behavior is falsely implemented

## Done Means

This slice is done when the repo has a runnable Expo shell that looks like the beginning of a native app, while still being honest about what is not implemented yet.
