# Audit — Harness Hyper-Boost 2026-09-10

## Intent

Replace the paid/cloud-gated Ultimate Web Scraper MCP path with a current open-source web acquisition layer and wire it into the existing AI Forge control plane together with context optimization, code memory, deep graph, security gates, discovery registries, loops, agents and observability — without turning every component on globally.

## Decisions

- Primary web MCP: Scrapling 0.4.15 (BSD-3-Clause).
- Bulk/RAG crawler fallback: Crawl4AI 0.9.3, isolated/on-demand.
- Interactive browser fallback: Browser Use 0.13.10, on-demand.
- Core context: Context Mode 1.0.169; explicitly marked Elastic-2.0 / source-available, not OSI OSS.
- Structural memory: codebase-memory-mcp 0.10.8 with release checksum verification.
- Deep graph: Graphify 0.9.47, on-demand.
- Gateway candidate: IBM ContextForge 1.0.9, optional/isolated.
- MetaMCP not selected as primary while an OAuth token access-control issue is reported open.
- Security/evals: Promptfoo 0.122.2, Trivy 0.74.0, Gitleaks 8.30.1.
- Cyber discovery: Tenable CyberAgents Exchange, metadata-only until upstream inspection/admission.
- General discovery: official MCP Registry, awesome-mcp-servers, Glama, skills.sh, Vercel Agent Skills, Smithery; no auto-install.
- Agent providers catalogued: OpenCode and OpenHands; no forced always-on execution.
- Loop strategy: Ralph-style bounded fresh-session loop pattern; external loops remain references until reviewed.
- Existing Session Evidence Fabric remains canonical evidence; OpenTelemetry/Langfuse are optional overlays.

## Package/runtime policy

- Node package manager: pnpm only.
- npm/npx/Yarn forbidden in new harness commands.
- Canonical third-party components are pinned.
- No public unauthenticated HTTP MCP endpoints.
- No marketplace component enters runtime without quarantine and review.

## Repository changes in this atomic change

- Add `hub/harness-registry.json`.
- Add `docs/architecture/HARNESS_HYPER_BOOST_2026-09-10.md`.
- Add `scripts/harness-hyper-boost.ps1`.
- Add `scripts/export-harness-client-configs.ps1`.
- Update `forge.config.yaml` to v2 harness/profile policy.
- Update `.agents/tools.json` to pnpm/profile routing.
- Update `package.json` to declare pnpm and remove npm from test script.
- Correct legacy MCP doctor/export scripts to pnpm.
- Expand `hub/sources.json` with discovery registries.
- Ignore disposable harness/index state.

## Verification boundary

GitHub-side wiring is not machine runtime proof. The local bootstrap must still run on the Windows host, generate disposable client configs, start the chosen MCP client and produce successful handshakes/doctor evidence. No claim is made here that third-party binaries are already running on Abraham's PC.

## Follow-up

Generate a real `pnpm-lock.yaml` locally from the existing dependency graph, run build/tests, and only then remove the historical `package-lock.json` in a separate audited commit. Do not fabricate a lockfile remotely.
