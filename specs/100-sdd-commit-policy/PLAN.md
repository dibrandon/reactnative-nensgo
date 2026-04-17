# 100-sdd-commit-policy PLAN

## Metadata

- Status: Completed
- Date opened: 2026-04-17
- Last updated: 2026-04-17
- Branch: `main`
- Commit type: `docs`
- Commit scope: `sdd`
- Commit subject draft: `formalize commit policy for completed slices`
- Spec reference: `100-sdd-commit-policy`
- Plan reference: `specs/100-sdd-commit-policy/PLAN.md`

## Context

The user requested that every completed plan or slice leave a clear and standard git history trail so another developer can reconstruct repository evolution from commits alone.

## Current State

Before this slice, the repository had:

- one bootstrap commit in git history
- SDD docs and specs already in place
- no explicit commit policy in `AGENTS.md`
- no commit metadata in the shared plan template
- no workflow rule that made a final commit mandatory for completed slices

## Goal

Make traceable closing commits part of the SDD operating system so completed slices are documented both in repo docs and in git history.

## In Scope

- require a final commit in the repo rules
- define the closing commit format and message structure
- add commit metadata fields to the plan template
- record the decision in the repo log
- update current state docs to reflect the new workflow reality

## Out Of Scope

- adding automation or hooks to enforce the policy
- changing product roadmap phases
- creating the Expo scaffold
- changing runtime behavior of the future mobile app

## Assumptions To Avoid

- assuming a completed plan is closed without a commit
- assuming file count determines the commit type
- assuming `wip` commits are acceptable as the shared repo standard
- assuming commit tooling exists to enforce these rules automatically

## Touched Files

- `AGENTS.md`: require a final slice commit in close-out and done rules
- `PLANS.md`: add commit metadata and closure rules to the shared template
- `docs/PROJECT_STATE.md`: reflect the initialized git history and workflow reality
- `docs/FEATURE_STATUS.md`: register this completed process slice
- `docs/SDD_WORKFLOW.md`: insert the explicit commit step and commit format
- `docs/DECISIONS_LOG.md`: record the policy as a durable operating decision
- `specs/000-bootstrap/PLAN.md`: backfill commit metadata for the bootstrap slice
- `specs/100-sdd-commit-policy/SPEC.md`: define this slice
- `specs/100-sdd-commit-policy/PLAN.md`: record execution and closure details

## Risks

- duplicating rules across documents in conflicting ways
- making the policy too tool-specific for an early repo
- leaving the bootstrap slice without visible commit metadata

## Mitigations

- keep `AGENTS.md` high-level and put exact format rules in `docs/SDD_WORKFLOW.md`
- avoid commit hooks or enforcement tooling in this slice
- update the bootstrap plan with its closing commit metadata

## Execution Sequence

1. close the existing bootstrap slice with its own long-form commit
2. update the SDD operating docs with the new commit policy
3. add a dedicated spec and plan for the policy slice
4. verify the docs agree on the closure rules
5. close this slice with a compliant commit

## Validation

- inspected the repo history after the bootstrap commit was created
- verified the updated docs all require a final slice commit
- verified the plan template now captures commit metadata
- verified the workflow doc defines allowed types, body sections, and `wip` restrictions
- no build, lint, or tests could run because the repository still has no application scaffold

## Definition Of Done

- repo docs require a final traceable commit for completed slices
- plan templates include commit closure metadata
- the bootstrap slice records its closing commit
- this slice is itself committed using the new standard

## Outcome

Completed on 2026-04-17.

The repository now treats the final commit as part of slice closure instead of a separate informal step.

## Follow-Ups

- optionally add commitlint or repo templates later if automation becomes necessary
- keep future product slices aligned with this commit format from their first implementation commit
