# 000-bootstrap SPEC

## Status

Completed on 2026-04-17

## Problem

The repository started with no application code, no project docs, and no operating rules for autonomous work. That made future implementation high-risk because scope, state, and decisions could drift immediately.

## Objective

Establish the repository operating system for spec-driven development so future React Native POC work can proceed in bounded, documented phases.

## In Scope

- `AGENTS.md`
- `PLANS.md`
- `.codex/config.toml`
- `docs/` baseline operating documents
- `specs/000-bootstrap/SPEC.md`
- `specs/000-bootstrap/PLAN.md`
- initial feature roadmap and status register
- initial decisions log

## Out Of Scope

- Expo or React Native app scaffold
- navigation implementation
- UI or theme implementation
- catalog feature implementation
- detail feature implementation
- auth implementation
- CI setup

## Constraints

- document reality, not aspiration
- do not imply the repo is already runnable
- keep the next implementation slice clear and narrow
- prefer Expo later unless repo reality changes

## Acceptance Criteria

- required SDD files exist in the repository
- the docs describe the empty starting state honestly
- the roadmap phases are explicit
- the next implementation slice is identifiable
- no app implementation is falsely represented as complete

## Done Means

This slice is done when the repository can support future planned work without relying on chat memory or ad-hoc prompting.
