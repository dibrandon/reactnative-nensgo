# AGENTS.md

## Project Mission

This repository hosts the React Native proof of concept for NensGo.

Current priority:

1. establish a reliable spec-driven development workflow
2. document the real project state
3. implement the mobile POC in phased slices only after scope is explicit

Do not treat this repository as a free-form coding sandbox.

## Mandatory Read Order

Before any non-trivial task, read in this order:

1. `AGENTS.md`
2. `PLANS.md`
3. `docs/DOCS_INDEX.md`
4. `docs/PROJECT_STATE.md`
5. `docs/ARCHITECTURE.md`
6. `docs/FEATURE_STATUS.md`
7. `docs/TECH_DEBT.md`
8. the relevant `specs/<id>-<feature>/SPEC.md` and `specs/<id>-<feature>/PLAN.md` if they exist

If repo docs exist, do not rely on chat memory instead of reading them.

## Branching And Scope

- Work on the branch explicitly requested by the user.
- If the user did not specify a branch, work on the current branch. Do not assume `main` is the intended target.
- Any task that touches more than one file, changes architecture, or exceeds a small localized fix requires a plan first.
- If the client supports Plan Mode, use it for non-trivial work.
- If Plan Mode is unavailable, emulate it by updating the task plan plus the relevant `specs/.../PLAN.md` before implementation.
- Declare touched files before substantial implementation.
- Do not edit outside the declared touched files unless new evidence requires it. If scope expands, update the plan first.
- Never revert user changes unless explicitly instructed.

## Reality Rules

- Document reality, not aspiration.
- Separate current state, current phase target, and future roadmap.
- Do not mark partial work as done.
- Do not invent backend contracts, auth behavior, APIs, analytics, or data models that are not documented in the repo.
- Record unknowns as assumptions, risks, or open questions.
- Prefer incremental POC-friendly implementation over wide speculative scaffolding.

## Project-Specific Direction

- Default mobile stack for this repo is Expo unless the repo state or explicit user instruction requires something else.
- Do not jump from an empty repo to a full app build.
- Foundation should progress in this order:
  1. SDD operating system
  2. Expo app scaffold and navigation shell
  3. visual system and tokens
  4. first real user flows
  5. feasibility layers and evaluation
- Every meaningful feature must have:
  - `specs/<id>-<feature>/SPEC.md`
  - `specs/<id>-<feature>/PLAN.md`

## Required Preflight For Non-Trivial Work

Before implementation, produce a concise preflight that covers:

1. summary of the request
2. exact files to create or touch
3. current repo state found
4. assumptions to avoid
5. proposed structure or design
6. roadmap phase affected
7. risks of starting implementation too early
8. execution sequence
9. validation plan

## Close-Out Discipline

After each completed task, update what changed:

- the relevant spec and plan
- `docs/FEATURE_STATUS.md`
- `docs/TECH_DEBT.md` if debt changed
- `docs/DECISIONS_LOG.md` when a real process or architecture decision was made
- `docs/PROJECT_STATE.md` if repo reality changed materially

Every completed slice must also end with a final git commit.

Commit rules:

- use a Conventional Commit style subject in English
- keep the subject brief and imperative
- include a long-form body with `Context`, `Changes`, `Validation`, and `Follow-ups`
- reference the active spec and plan in the commit body
- do not use `wip` as the shared repo history standard

## Definition Of Done

A task is only done when:

- scope matches the active spec and plan
- touched files stay within approved scope
- validation was run, or inability to validate is recorded explicitly
- docs reflect the resulting reality
- a final slice commit exists in git history
- remaining gaps are called out as follow-ups or debt
