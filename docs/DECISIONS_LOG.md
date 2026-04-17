# Decisions Log

## 2026-04-17 - ADR-0001 - Use SDD As The Repo Operating Model

Decision:

The repository will use spec-driven development as its default way of working for non-trivial tasks.

Why:

The repo started empty. Without durable specs, plans, and state docs, autonomous work would drift immediately.

Impact:

- non-trivial work requires a spec and a plan
- docs must be kept aligned with implementation
- future tasks must read repo context before coding

## 2026-04-17 - ADR-0002 - Default To Expo For The Mobile POC

Decision:

Expo is the default target stack for the first React Native scaffold unless later repo reality or explicit user instruction overrides it.

Why:

The repository currently has no mobile implementation, and Expo keeps the first POC slice narrow and fast to validate.

Impact:

- the next implementation plan should assume Expo first
- routing and state details remain open until the scaffold phase
