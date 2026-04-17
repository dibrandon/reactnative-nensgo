# 008-expo-go-sdk-54-compat SPEC

## Status

Completed on 2026-04-18

## Problem

The current repository runs on Expo SDK 55, but the user needs to preview the app on a physical phone through Expo Go. During the current Expo Go rollout window, the default store build still targets SDK 54, so the app cannot be opened on-device through the normal Expo Go path without changing the project runtime.

## Objective

Downgrade the project from Expo SDK 55 to Expo SDK 54 so the current POC can be opened on a phone with the default Expo Go app from the stores.

## In Scope

- downgrade Expo runtime dependencies from SDK 55 to SDK 54
- align related React Native and Expo package versions through the official Expo workflow
- adjust app configuration only if SDK 54 requires it
- validate that the app still builds after the downgrade
- update repo docs to reflect the new runtime reality

## Out Of Scope

- changing POC product scope
- adding production auth
- changing catalog, detail, or account behavior
- switching to development builds instead of Expo Go

## Constraints

- use the official Expo downgrade workflow, not ad hoc version guessing
- keep the current native POC behavior intact
- document the downgrade as a compatibility decision, not as a product feature

## Acceptance Criteria

- the repo depends on Expo SDK 54-compatible package versions
- typecheck and Expo export still pass
- repo docs reflect that the current runtime baseline is SDK 54
- the downgrade is closed with a traceable slice commit

## Done Means

This slice is done when the repo is compatible with Expo Go's current SDK 54 store build and the documentation no longer claims SDK 55 as the implemented runtime.
