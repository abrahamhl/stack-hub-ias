# Permission Model

The permission model for the MCP Bridge utilizes a capability-based approach.

## 1. Secrets and Protected Paths
Even if a root directory is exposed, the bridge intrinsically protects sensitive paths. The following patterns are hard-blocked by the policy engine and will throw unauthorized exceptions if targeted:
- `.git/` directories
- `.env` files (including `.env.local`, `.env.production`)
- `.npmrc`
- `node_modules/`
- `.pem`, `.key`, `id_rsa`, `id_ed25519`
- Any path containing `credentials` or `secrets`

## 2. Tool Permissions
- `read_file`: Available on all exposed roots.
- `write_file`: Only available on roots explicitly configured as `"mode": "audit-write"`.
- `list_directory`: Available on all exposed roots, but filters out protected directories (like `.git`) from the results.
- `run_command`: Hardcoded via an allowlist. Agents cannot pass raw bash commands; they select a predefined ID.

## 3. Auditing
Every file modification through `write_file` triggers an immutable audit log entry in the bridge's output, ensuring that human reviewers have a clear history of what the agent modified, bypassing the need to trust the agent's self-reported actions.
