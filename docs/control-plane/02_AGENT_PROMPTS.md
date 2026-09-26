# Fábrica IA — Prompts exactos del sprint

Estos prompts presuponen que cada writer trabaja en un worktree/rama diferente. No cambiar scopes sin aprobación.

## A. Claude Code — Arquitecto e integrador

```text
ROLE: Principal Systems Architect + Integration Engineer.
REPO: abrahamhl/stack-hub-ias.
GOAL: freeze the minimum contracts for Fabrica IA and make the repository conform to its existing security/package-manager policy before other writers start.

READ FIRST, DO NOT GUESS:
- CLAUDE.md
- AGENTS.md
- docs/control-plane/00_CANONICAL_BRIEF.md
- docs/control-plane/01_SPRINT_2H_OWNER_MATRIX.md
- docs/architecture/2026-07-23-ai-forge-runtime.md
- docs/architecture/FORK_CAPABILITY_MATRIX.md
- existing evidence_fabric/, hub/, db/, scripts/, mcp/ and app/ structures.

NON-NEGOTIABLE:
- pnpm only. Corepack + packageManager pinned + pnpm-lock.yaml. Never npm/npx/Yarn.
- No new dependency without explicit Abraham approval and documented security justification.
- Never print, read into prompts, commit or log secrets.
- Reuse existing code/contracts before creating parallel implementations.
- Do not touch app/control-plane UI or provider implementations; those are separate lanes.
- No auto-merge or deployment.

PHASE 1 ONLY:
1. Audit current package manager, lockfiles, README commands, CI, secret surfaces and duplicated canonical registries.
2. Propose the smallest target structure. Prefer adapting existing modules rather than creating a new framework.
3. Define/reuse typed contracts for Provider, Model, Harness, Runtime, Project, Workspace, Agent, Skill, Connector, Session, Workflow, Run, Evidence, CredentialRef and capability/health/cost state.
4. Ensure unknown/unavailable data is representable without inventing values.
5. Migrate npm artifacts/commands to pnpm/Corepack only if it can be done reproducibly with the current dependency graph and no package changes. If not, STOP and report blocker.
6. Run existing tests/build/lint using pnpm only.
7. Commit one focused `contracts-v1` commit and STOP. Do not implement the UI or provider adapters.

RETURN EXACTLY:
- BASE SHA
- HEAD SHA
- changed files
- reused existing modules
- package-manager changes
- commands executed + results
- blockers
- paths that UI lane may write
- paths that Provider lane may write
- VERIFIED / PARTIAL / BLOCKED
```

Recommended model: Fable 5.1 High if available in installed Claude Code; fallback Opus 5 High. Use one high-quality architecture pass, not repeated brainstorming.

## B. Antigravity — UI lane

```text
ROLE: Senior Product Engineer + IDE UX specialist.
SCOPE: ONLY app/control-plane/**. Do not modify root config, package files, provider adapters, db schema, shared globals, MCP, scripts or existing dashboard unless the integrator explicitly expands scope.

CONTEXT:
Read docs/control-plane/00_CANONICAL_BRIEF.md and frozen contracts from contracts-v1.

BUILD a functional UI shell using existing dependencies only:
- resizable left activity/sidebar inspired by mature IDE interaction patterns without copying proprietary assets;
- Explorer, Providers, Models, Agents, Skills, Projects, Conversations, Runs, Costs, Connectors/MCP and Settings;
- central workspace; optional right inspector; bottom terminal/run drawer placeholder;
- semantic status colors VERIFIED/LOCAL_ONLY/REVIEW/BLOCKED/UNKNOWN;
- density/theme/accent settings represented locally;
- fixture data typed against contracts-v1;
- no live provider secrets or API calls;
- accessible keyboard/focus behavior and responsive layout.

UX PRIORITY:
A user should understand in <10 seconds: what project is active, what models/providers are available, what is running, what costs money, and what needs attention.

NO new dependencies. pnpm only. Never npm/npx/Yarn.

RUN applicable lint/build/tests and RETURN:
BASE SHA, HEAD SHA, changed files, screenshots if your environment supports them, commands/results, blockers, VERIFIED/PARTIAL/BLOCKED.
Do not merge.
```

Recommended model: Gemini 3.8 Flash High in Antigravity where available; if unavailable use the strongest current Gemini coding model exposed by the product and report the exact model actually used.

## C. DeepSeek — Provider adapters lane

```text
ROLE: Senior Integration Engineer.
SCOPE: ONLY lib/control-plane/providers/** and tests/control-plane/providers/** unless contracts-v1 specifies a narrower canonical path. Do not edit UI, package files, lockfiles, root config, existing hub registries or GitHub workflows.

READ docs/control-plane/00_CANONICAL_BRIEF.md and the exact frozen contracts-v1 SHA.

IMPLEMENT with built-in fetch / existing dependencies only:
1. ProviderAdapter contract implementation for DeepSeek official API.
2. ProviderAdapter for Cheaper Inference using its official API and GET /v1/models.
3. ProviderAdapter for NVIDIA Build using its official OpenAI-compatible API.
4. health/capability/model discovery without inventing unavailable metadata.
5. usage/balance only when an official documented endpoint and the credential scope permit it; otherwise return UNKNOWN/UNAVAILABLE with source/reason.
6. CredentialRef only. Resolve keys from process environment at execution time; never persist or log them.
7. timeout, cancellation, safe error normalization and redacted logs.
8. contract tests using node:test and mocked/stubbed fetch. Tests must not consume paid inference.

NEVER scrape a dashboard. NEVER bypass rate limits. NEVER rotate accounts to extend quotas. NEVER add a dependency. pnpm only.

RETURN:
BASE SHA, HEAD SHA, exact endpoints implemented, tests/results, unsupported fields explicitly listed, changed files, security notes, VERIFIED/PARTIAL/BLOCKED.
Do not merge.
```

Recommended model: DeepSeek V4 Pro, High reasoning. Prefer official DeepSeek credits; Cheaper route is acceptable only if the exact model/provider is visible and logged.

## D. Gemini / Vertex — independent review

```text
ROLE: Independent Principal Architecture + Security Reviewer.
MODE: READ ONLY. DO NOT EDIT OR COMMIT.

Review contracts-v1 plus the Provider and UI diffs when available.
Evaluate:
- canonical source duplication;
- provider/model lifecycle drift;
- secret handling;
- cancellation/timeouts/retries;
- Windows path/worktree behavior;
- concurrent writers and race conditions;
- audit/evidence completeness;
- cost/usage claims vs observed evidence;
- portability;
- tests and failure modes;
- whether the design can add OpenClaw, OpenCode, Jules, chat import and creative providers later without rewriting the core.

Return findings ranked BLOCKER/HIGH/MEDIUM/LOW, then a merge recommendation: ACCEPT / ACCEPT_WITH_FIXES / REJECT.
Cite exact files/lines or diffs for every BLOCKER/HIGH finding. Do not propose cosmetic churn.
```

Recommended model: Gemini 3.8 Flash High for cost-efficient broad review; escalate only unresolved architecture blockers to a stronger Vertex model available to the account.

## E. Jules — existing lane, no overlap

Do not give Jules central control-plane code during this sprint. Jules continues GitHub issue #4: cross-repo Senior Gate, evidence ledger and truth audit. Its output is review input, not an integration branch.
