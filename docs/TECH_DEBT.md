# Tech Debt

Last updated: 2026-04-17

## Current Debt Reality

There is no implementation debt yet because there is no application code in the repository.

## Known Structural Gaps To Track

These are not defects in shipped code yet, but they are important gaps to track as the POC begins:

- App icons and generated Expo assets are still scaffold-level, not curated NensGo production assets.
- No lint, format, test, or CI baseline exists.
- The shared UI layer is still intentionally thin and shell-biased.
- No backend contract or auth contract is documented.
- No mock data strategy has been implemented yet.
- `Cuenta` is a visible placeholder only; no auth viability work has started yet.

## Debt Recording Rule

Once implementation starts, this file should track:

- deliberate shortcuts taken to keep the POC moving
- unresolved architecture compromises
- missing validation that should be added later
- places where mock data or temporary adapters need replacement
