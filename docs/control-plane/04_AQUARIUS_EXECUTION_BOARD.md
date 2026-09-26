# Aquarius — Execution Board

## Rule zero
No two coding agents may modify overlapping paths at the same time. Parallel work is allowed only after the canonical contracts commit is frozen.

## Current lanes

### Lane A — Claude Code / Opus 4.5 via Cheaper Inference
Owner: principal architect + integrator.
Write scope: contracts, package-manager migration, architecture docs, integration commits.
Must not build the public marketing website or provider-specific adapters during Gate 0.

### Lane B — DeepSeek official API
Owner: provider-adapter engineer after Gate 0.
Write scope: `lib/providers/**`, provider tests/fixtures, health/model discovery and isolated launch profiles.
Initial adapters: DeepSeek, Cheaper Inference, NVIDIA Build/NIM where officially supported.

### Lane C — Antigravity / Gemini
Owner: product UI engineer after Gate 0.
Write scope: `app/control-plane/**`, UI-only components, design tokens and mocks. Consume contracts; do not redefine them.

### Lane D — Z.ai
Owner: public marketing/site lane.
Must use a separate repository or explicitly separate site path; do not edit Aquarius core runtime files.
Goal: next-gen Aquarius product site inspired by the clarity and technical elegance of LiteLLM, but with original Aquarius branding and content.

### Lane E — ChatGPT
Owner: product manager, connected-source auditor, GitHub reviewer, hiring pipeline and cross-lane coordination.
Do not claim local filesystem visibility unless the folder is opened through ChatGPT desktop Work/Codex or supplied by the user.

### Lane F — Jules
User-controlled senior remote worker. Keep separate from core implementation unless given a specific isolated issue/worktree. No auto-merge; evidence gate required.

## Gate sequence
1. Gate 0: contracts + pnpm/Corepack + architecture truth.
2. Freeze contracts SHA.
3. Create disjoint worktrees/branches for UI and providers.
4. Implement UI and adapters in parallel.
5. Independent reviewer checks both lanes read-only.
6. Principal architect integrates one lane at a time.
7. Build, tests, secrets scan, evidence, draft PR.
8. Only then expand to chat import, routing learning, background jobs and additional providers.

## First provider/access priorities
P0: Cheaper Inference, DeepSeek official, Vertex/Gemini, NVIDIA Build/NIM, OpenCode model catalog.
P1: Hugging Face Inference Providers, OpenRouter, Groq, Cerebras.
P2: creative APIs and service integrations such as Magnific/Higgsfield when official APIs/MCPs exist.

## Local-files strategy
Preferred for ChatGPT: new ChatGPT desktop app -> ChatGPT -> Work -> open local folder/project and grant only required access. Codex can also open local folders/repositories, but Work and Codex have separate usage rules from normal Chat. Do not route ChatGPT subscription access through OpenCode as though it were a free API.

## Project-reorganization policy
Before moving or deleting anything:
- inventory paths;
- calculate hashes where useful;
- identify Git roots/remotes;
- classify canonical / duplicate / archive / staging / unknown;
- record move plan;
- move only after review;
- never destroy originals during first pass.

Known previous audit area to reconcile: `C:\dev\_ABRAHAM_CODEBASE_AUDIT\` and its staging/handoff artifacts, plus the repository's existing `.ai-forge/audit/project-inventory.json` and project-inventory scripts.
