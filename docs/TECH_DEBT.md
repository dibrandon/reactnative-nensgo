# Tech Debt

Last updated: 2026-04-17

## Current Debt Reality

There is no implementation debt yet because there is no application code in the repository.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- No runnable Expo scaffold exists.
- No package manager or dependency policy has been established in code.
- No lint, format, test, or CI baseline exists.
- No routing choice has been made inside Expo.
- No backend contract or auth contract is documented.
- No mock data strategy has been implemented yet.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
