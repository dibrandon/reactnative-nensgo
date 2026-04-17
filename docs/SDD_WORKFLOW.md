# SDD Workflow

This repository uses spec-driven development for any work that is larger than a trivial local change.

## Required Workflow

### 1. Read The Operating Context

Before implementation, read:

- `AGENTS.md`
- `PLANS.md`
- `docs/DOCS_INDEX.md`
- the current project state docs
- the relevant feature spec and plan, if they exist

### 2. Produce A Preflight

Before changing code, capture:

1. summary of the request
2. files to create or touch
3. current repo state found
4. assumptions to avoid
5. proposed structure or design
6. roadmap phase affected
7. risks of starting too early
8. execution sequence
9. validation plan

### 3. Create Or Update The Spec

Each meaningful feature needs:

- `specs/<id>-<feature>/SPEC.md`
- `specs/<id>-<feature>/PLAN.md`

The spec defines:

- the problem
- in-scope work
- out-of-scope work
- dependencies or deferred items
- what done means

### 4. Plan Before Implementing

Use Plan Mode if it is available in the client.

If it is not available, the fallback is still mandatory:

- update the working task plan
- update `specs/<id>-<feature>/PLAN.md`
- keep touched files explicit

### 5. Implement Narrowly

- Stay inside touched files.
- If scope grows, update the plan before expanding edits.
- Do not blend multiple roadmap phases into one task.

### 6. Validate

Run the strongest validation the repo supports:

- build
- tests
- lint
- smoke checks
- manual verification notes when automation is absent

If validation cannot run, record why.

### 7. Create The Final Slice Commit

Every completed slice must end with one final commit that closes the work.

Required subject format:

- `<type>(<scope>): <imperative summary>`

Allowed types:

- `feat`
- `fix`
- `docs`
- `chore`
- `refactor`
- `test`
- `build`
- `ci`
- `perf`

Commit rules:

- use English for the commit subject
- keep the subject short and scannable
- include these body sections in this order:
  - `Context`
  - `Changes`
  - `Validation`
  - `Follow-ups`
- include:
  - `Spec: <id-slug>`
  - `Plan: specs/<id-slug>/PLAN.md`
- choose the commit type by the primary outcome of the slice
- if a slice mixes docs and code, the type follows the main result, not file count
- do not use `wip` as the standard shared history for this repo

### 8. Close Out The Slice

After the task, update:

- the spec and plan
- `docs/FEATURE_STATUS.md`
- `docs/PROJECT_STATE.md` if repo reality changed
- `docs/TECH_DEBT.md` if debt changed
- `docs/DECISIONS_LOG.md` if a real decision was made

A slice is not complete until both the docs and the final commit exist.

## Anti-Patterns

Do not:

- start feature implementation from chat memory alone
- confuse roadmap intent with current implementation
- mark partial work as complete
- invent missing backend or auth behavior
- touch broad areas of the repo without declaring scope first
- use `wip` commits as the documented shared history standard
