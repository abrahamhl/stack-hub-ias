# Evidence Fabric Baseline

## Existing Architecture Overview
The repository currently contains fragmented configuration and rule definitions for multiple AI agents:
- **AGENTS.md**: Defines rules for Codex and acts as the central protocol for the AI Forge.
- **CLAUDE.md**: A Claude-specific variant of the central protocol.
- **SOUL.md**: Defines the shared identity and core values of the AI factory.
- **.agents/**: Contains the control plane for skills and agent-specific files (e.g., `tools.json`).
- **.antigravity_code/**: Contains instructions, rules, and synchronization protocols for the Antigravity system.
- **.claude/**: Contains Claude-specific mirrors of skills.
- **.openai/**: Contains OpenAI hosting configuration.
- **.skills/**: Contains the canonical skill registry and implementation.
- **.ai-forge/**: Contains audit logs (`.ai-forge/audit/`).

## Overlap and Duplication
- **Skills**: Skills are defined centrally in `.skills/` but mirrored in `.agents/skills/` and `.claude/skills/`.
- **Rules**: Protocol rules are duplicated across `AGENTS.md` and `CLAUDE.md`, with Antigravity having its own rule set in `.antigravity_code/RULES.md`.
- **Logs**: Audit logs live in `.ai-forge/audit/`, while git commits serve as the ultimate truth. Decision making and handoffs are implied to be part of the audit logs but lack a unified, structured format (capsule).

## Missing Elements
- No unified session artifact combining work from different agents.
- No standard way to express evidence for claims made by agents.
- No automated secret redaction for public exports.
- No conflict resolution or staleness detection mechanisms based on git history.
