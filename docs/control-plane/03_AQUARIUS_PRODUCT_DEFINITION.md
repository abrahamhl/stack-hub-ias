# Aquarius — Product Definition

## Name
**Aquarius** is the product name. The metaphor is an aquarium/ecosystem: large and small AI models, runtimes, providers, agents, skills and tools coexist in a visible, fluid environment with clear boundaries and observable flows.

## Product sentence
Aquarius is a local-first AI workspace and control plane that unifies projects, chats, models, providers, agents, tools, terminals, Git state, costs, workflows and evidence without replacing the official providers or depending on one model vendor.

## Core user experience
The UI should feel as immediate as Claude Code / Codex / ChatGPT, while adding the provider/model discoverability of OpenCode and the project/runtime visibility of a desktop engineering workspace.

Aquarius MUST support:
- local desktop use and local workspaces;
- external official APIs/gateways/proxies where terms allow;
- provider/model discovery;
- multiple simultaneous sessions/terminals;
- project/repository Explorer;
- editable per-user / per-project / per-agent settings;
- editable system prompts and agent profiles;
- chats, branches, export/import and provenance;
- tasks/workflows with logs, costs and evidence;
- Git checkpoints, branches and safe rollback;
- skills, MCP/connectors and runtimes;
- background and scheduled work;
- cost/credit observability where provider APIs expose it;
- official deep links to billing/provider consoles when payment must happen externally.

## Product layers
1. **Aquarium / UI** — chat, explorer, terminals, model/provider views, settings, workflows, logs.
2. **Registry** — canonical entities: Provider, Model, AccessRoute, Harness, Runtime, Agent, Skill, Connector, Project, Workspace, Session, Workflow, Run, Evidence, CredentialRef.
3. **Adapters** — official provider/runtime integrations. No undocumented bypasses.
4. **Router** — chooses a route based on capability, privacy, availability, remaining budget, historical score, cost and latency.
5. **Evidence + learning** — records outcomes, edits, retries, tests, user corrections and scorecards to improve future routing without requiring foundation-model training.

## Important distinction
A subscription/web entitlement is not automatically an API entitlement. Aquarius records each access route separately (for example: ChatGPT subscription, Codex entitlement, OpenAI API).

## Non-goals for first vertical slice
- no new foundation model;
- no VS Code fork;
- no replacement for OpenCode, Claude Code, Codex, Gemini CLI or Jules;
- no credential scraping;
- no undocumented API emulation;
- no automatic payment handling;
- no auto-merge without explicit gate.

## Visual identity
- Product: **Aquarius**
- Concept: liquid multi-ecosystem / aquarium of intelligence
- Mood: deep ocean, glass, bioluminescent status signals, calm technical precision
- UX rule: decorative aquatic metaphors never reduce information density or engineering clarity.
- Status color semantics must stay consistent across the entire product.

## First success criterion
Aquarius can open one local project and show, in one screen:
1. real Git/workspace state;
2. connected providers;
3. discoverable models;
4. available agents/runtimes;
5. one chat/workflow;
6. one terminal;
7. run logs/evidence;
8. cost/usage information where verifiable;
9. a safe provider/model switch without changing global machine configuration.
