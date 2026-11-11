---
name: operating-abraham-mcp
description: Configure, operate and audit the local Abraham OS MCP bridge that exposes selected project roots, safe file reads, text search, Git status and dedicated audit-note writes. Use when connecting Codex, Claude, VS Code, Cursor-like tools or other MCP clients to local folders, changing MCP permissions, adding a tool, debugging the bridge, or reviewing its audit log.
---

# Operate Abraham MCP

## Verify the bridge

1. Locate `mcp/abraham-os-bridge`.
2. Read `config/policy.example.json`.
3. Confirm each real root exists.
4. Build and run tests.
5. Start the bridge over `stdio`.

Use `scripts/emit-client-config.ps1` to print a client snippet. Review it before
copying it into a client configuration.

## Apply least privilege

Read [security-model.md](references/security-model.md) before adding a root or
tool.

Keep roots narrow. Prefer project roots over `C:\dev` and never permit a drive,
home directory or credential store.

## Preserve the write boundary

The MVP may write only:

- `.ai-forge/audit/*.md`;
- `.ai-forge/logs/events.ndjson`.

Do not add arbitrary shell, deletion, Git push or unrestricted patch tools
until identity, confirmation and rollback are implemented.

## Add tools safely

1. Define one narrow capability.
2. Validate input with a schema.
3. Resolve paths against an allowed root.
4. cap bytes, time and result count;
5. annotate read-only and destructive behavior;
6. emit an audit event;
7. test success and denial paths.

## Diagnose

Never print environment variables, tokens or secret file content. Report the
client, transport, tool, policy root, timestamp and safe error only.
