# 100-sdd-commit-policy SPEC

## Status

Completed on 2026-04-17

## Problem

The repository had no enforced rule for how completed slices should be represented in git history. That made it too easy for future work to close only in docs or to leave ambiguous commit messages that would be hard to audit during a handoff.

## Objective

Formalize a commit policy for completed SDD slices so the repository history can stand on its own as an operational record.

## In Scope

- update `AGENTS.md` with commit-based close-out requirements
- update `PLANS.md` to include commit metadata
- update `docs/SDD_WORKFLOW.md` with the required commit step and message format
- update `docs/DECISIONS_LOG.md` with the new operating rule
- update repo state and feature status docs where the workflow reality changed
- create this spec and plan for the policy slice

## Out Of Scope

- commit hooks or commitlint tooling
- CI enforcement
- branch protection rules
- release automation
- changes to runtime application code

## Constraints

- use Conventional Commit style subjects in English
- require long-form commit bodies for closing slices
- keep the rule process-oriented, not tool-dependent
- avoid implying that `wip` commits are part of the shared repo standard

## Acceptance Criteria

- the repo operating docs require a final commit for completed slices
- `PLAN.md` templates include commit metadata fields
- the workflow doc defines the closing commit format and selection rules
- the decision log records the policy as a durable rule
- the slice itself is closed with a compliant commit

## Done Means

This slice is done when a future developer can infer what a completed slice must commit and how that commit should be written without depending on chat context.
