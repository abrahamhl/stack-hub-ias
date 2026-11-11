# MCP Trust Boundary

The Abraham OS MCP Bridge establishes a strict, local trust boundary between AI Agents (like Claude or Cursor) and the host operating system.

## The Problem
Agents equipped with unrestrained execution capabilities (like full terminal access or unchecked file read/write) are inherently vulnerable to prompt injection, supply chain attacks, and hallucinations. A rogue or hallucinating agent could recursively read `~/.ssh`, delete databases, or modify `.env` files across the entire file system.

## The Boundary
To prevent this, the MCP Bridge enforces:
1. **Explicit Roots:** Agents cannot see the entire file system. They are constrained to explicit directory roots defined in `config/policy.local.json`.
2. **Read-Only by Default:** Roots are strictly `read-only` unless explicitly elevated to `audit-write`.
3. **No Terminal/Shell Access:** The bridge exposes a `run_command` tool, but it only accepts exact, pre-registered commands (like `npm run lint`). The agent cannot pass arbitrary bash scripts.
4. **Traversal Protection:** The `policy.ts` engine resolves paths natively and strictly rejects `../` traversal attempts that escape the allowed root directory.
