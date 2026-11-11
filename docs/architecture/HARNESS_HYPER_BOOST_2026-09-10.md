# Harness Hyper-Boost — 2026-09-10

## Decision

`stack-hub-ias` remains the control plane and source of truth. Project repositories stay physically separate. The harness centralizes policy, routing, discovery metadata, client configs, audit evidence and activation profiles; it does **not** merge project histories or blindly load every tool into every model session.

## Web acquisition choice

Primary: **Scrapling v0.4.15** (`D4Vinci/Scrapling`, BSD-3-Clause).

Why it replaces Ultimate Web Scraper for this harness:

- Native MCP server with one-shot and persistent-session tools.
- Plain HTTP, browser-rendered and stealth browser acquisition.
- Bulk/concurrent acquisition, proxy support and session persistence.
- CSS-targeted extraction before content reaches the model.
- RAG-ready Markdown and prompt-injection-content stripping.
- Adaptive selectors and crawling/spider primitives.
- Streamable HTTP is localhost/auth hardened in v0.4.15; stdio remains the default here.

Secondary engines are deliberately not always-on:

- **Crawl4AI v0.9.3**: fallback for large LLM/RAG crawl jobs.
- **Browser Use v0.13.10**: interactive/authenticated browser flows where a scraper is the wrong primitive.
- Playwright MCP remains a reference fallback, not a default resident server. Coding agents should prefer direct Playwright code/skills when that is more token-efficient.

## Core nervous system

| Layer | Component | Responsibility | Default |
|---|---|---|---|
| Control | `stack-hub-ias` | policies, manifests, evidence, routing | Always |
| Local bridge | `abraham-os` | safe local read/audit bridge | Core |
| Context | Context Mode 1.0.169 | context reduction, FTS5 session memory, hooks | Core |
| Code memory | codebase-memory-mcp 0.10.8 | structural code graph, impact/call paths | Core |
| Deep graph | Graphify 0.9.47 | code + docs + schemas + config graph | On demand |
| Web | Scrapling 0.4.15 | acquisition/extraction | Research profile |
| Browser | Browser Use 0.13.10 | interactive browser execution | Browser profile |
| Gateway | IBM ContextForge 1.0.9 | federation/auth/guardrails | Optional |
| Evidence | Session Evidence Fabric | provider-neutral session evidence | Core evidence |
| Telemetry | OpenTelemetry Collector | neutral logs/traces/metrics bus | Optional |
| AI observability | Langfuse | traces/evals/metrics UI | Optional |

### Why codebase-memory + Graphify are both allowed

They are not interchangeable. `codebase-memory-mcp` is the low-latency structural index for daily coding questions. Graphify is the deeper cross-domain graph for architecture/repository/document relationships. Do not query both automatically for every task: route to Graphify only when the question needs graph depth or non-code artifacts.

### Context Mode licensing

Context Mode is requested and useful, but its current license is **Elastic License 2.0**, not an OSI-approved open-source license. It therefore remains an explicitly labelled source-available component rather than being misrepresented as OSS.

## Activation profiles

`core` is intentionally small: `abraham-os + context-mode + codebase-memory-mcp`.

`research` adds Scrapling. `deep-code` adds Graphify. `browser` adds Browser Use. `cyber` adds Graphify plus security/evaluation gates. `observability` adds external telemetry services only when needed. `gateway` is separate because a gateway adds another trust boundary and operational surface.

Never use a giant `all MCPs always on` configuration. Tool enumeration alone consumes context, and multiple servers can duplicate filesystem, browser, graph and search capabilities. Profiles are the hyper-boost: less idle overhead, clearer tool selection and smaller blast radius.

## Security profile

Canonical admission flow:

`discover metadata -> pin -> verify upstream/license -> quarantine -> secrets/supply-chain scan -> inspect MCP schemas/prompt-injection surface -> least-privilege allowlist -> healthcheck -> activate profile -> audit evidence`

The first security toolset is deliberately boring and effective:

- **Promptfoo 0.122.2** for LLM/agent/RAG red-team and evals. Run with `pnpm dlx`, never `npx`.
- **Trivy 0.74.0** for dependency/container/IaC/SBOM/vulnerability inspection.
- **Gitleaks 8.30.1** for secret detection.
- **CyberAgents Exchange** as a cybersecurity-native discovery registry only. Listings are metadata; inspect the upstream repository before admitting anything.

Snyk Agent Scan may be evaluated in a disposable sandbox, but is **not** a default local gate: scanning can start stdio MCP commands and its analysis service sends component metadata/content outside the machine after redaction. It requires explicit opt-in.

Cybersecurity skills and agents must additionally carry an authorization scope. A skill intended for pentesting does not get network/write credentials merely because it exists in a registry.

## Discovery sources

The harness tracks discovery sources rather than installing from them automatically: official MCP Registry, `awesome-mcp-servers`, Glama, skills.sh, Vercel Agent Skills, CyberAgents Exchange and Smithery. Popularity is a discovery signal, never a trust decision.

New marketplace content enters **quarantine**. No `curl | sh`, no arbitrary postinstall, no unpublished binary and no unpinned `latest` becomes part of the canonical runtime.

## Agents and loops

OpenCode and OpenHands are catalogued as optional open-source execution providers; existing Claude/Codex/Gemini/Jules roles remain valid. More simultaneous agents do not equal more throughput: the control plane should route tasks by capability/cost and spawn isolated worktrees or sessions only when work can truly proceed independently.

The preferred loop pattern is a Ralph-style fresh-session loop with explicit task state, bounded iterations, stop condition, tests/evidence and a progress file. External loop repositories are references until reviewed; the canonical state remains inside this repository's evidence fabric and audit trail.

## Gateway decision

Do **not** use MetaMCP as the primary gateway while its reported cross-user OAuth-token access-control issue remains unresolved.

IBM ContextForge is the current gateway candidate because it federates MCP/A2A/API endpoints and has current mTLS/OAuth/security-hardening work. It is optional rather than core. Its Admin UI must remain localhost-only, production access must be authenticated, and only trusted upstreams should be registered.

## Local bootstrap contract

Use `scripts/harness-hyper-boost.ps1` on Windows. Default execution is diagnostic and non-mutating. `-InstallApproved` installs only pinned approved components; browser binaries are a separate `-InstallBrowserDeps` decision. Node tooling uses **pnpm only**. Python tools use `uv`. Docker-backed services are optional.

Then run `scripts/export-harness-client-configs.ps1 -Profile <profile>` to generate local client configs under `.ai-forge/client-configs/harness/`. Generated runtime configs are intentionally git-ignored because they can contain machine-specific paths.

The repository-side registry is authoritative; a generated local config is disposable output.

## pnpm migration note

The repository still has a historical `package-lock.json`. This change stops introducing or documenting npm/npx and moves scripts to pnpm, but does not fabricate a `pnpm-lock.yaml` remotely. On the local machine, generate and validate the pnpm lockfile with the existing dependency graph, run build/tests, then remove the legacy npm lockfile in a separate audited commit.

## Definition of done for machine activation

Machine-level activation is complete only when the local doctor confirms the selected commands exist, client configs have been generated, the chosen client starts the MCP servers successfully, and an audit note records the evidence. A Git commit alone is wiring, not proof that the local processes are running.
