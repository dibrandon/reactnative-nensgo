# PLANS.md

Use this file as the repository standard for non-trivial execution plans.

## When A Plan Is Required

Create or update `specs/<id>-<feature>/PLAN.md` when any of the following is true:

- more than one file will be touched
- architecture, navigation, state, data, auth, or build setup will change
- the task will likely take more than one focused work session
- the request is ambiguous enough that implementation could drift
- the task introduces a new feature slice

Small, local, single-file changes can use a lighter plan in the working task update if scope is obvious.

## Plan Template

Copy the structure below into the relevant `specs/.../PLAN.md`.

```md
# <id>-<feature> PLAN

## Metadata

- Status: Planned | In Progress | Blocked | Completed
- Date opened: YYYY-MM-DD
- Last updated: YYYY-MM-DD
- Branch: <branch-name>
- Commit type: docs | chore | feat | fix | refactor | test | build | ci | perf
- Commit scope: <scope>
- Commit subject draft: <imperative summary in English>
- Spec reference: <id-slug>
- Plan reference: specs/<id-slug>/PLAN.md

## Context

Why this task exists and what triggered it.

## Current State

Concrete repo reality before implementation.

## Goal

What this slice should achieve now.

## In Scope

- item

## Out Of Scope

- item

## Assumptions To Avoid

- item

## Touched Files

- `path/to/file`: why it must change

## Risks

- risk

## Mitigations

- mitigation

## Execution Sequence

1. step
2. step
3. step

## Validation

- command or check

## Definition Of Done

- observable condition

## Outcome

What actually shipped, what did not, and why.

## Follow-Ups

- next task
```

## Planning Rules

- Plans must describe current reality, not imagined code.
- Writing a `PLAN.md` is not by itself a closure event; the closing commit happens when the full slice is completed.
- Touched files must stay narrow.
- If scope expands, update the plan before editing new files.
- Do not collapse roadmap items together just because they look related.
- Record blockers instead of silently working around missing inputs.
- A plan is not fully closed until the slice has its final git commit.

## Validation Rules

- Prefer real validation over narrative claims.
- If no build or tests exist yet, record that clearly.
- For POC work, include smoke checks and manual verification steps when automated validation is absent.
- Closing commits should include enough validation detail that another developer can understand what was actually checked.
