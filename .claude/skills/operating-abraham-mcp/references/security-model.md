# Abraham MCP security model

## Trust boundaries

- Chatbot output is untrusted intent.
- MCP tool input is validated data, not authority.
- Policy roots define reachable filesystem scope.
- Client confirmation governs sensitive external actions.
- Git history is evidence, not a substitute for backup.

## Denied by default

- secret and credential paths;
- `.git` internals;
- dependencies and build output;
- files above the read limit;
- paths outside a configured root;
- deletion;
- arbitrary commands;
- Git staging, commit or push;
- uploads or external notifications.

## Expansion sequence

1. Read-only project discovery.
2. Dedicated audit-note writes.
3. Patch proposals stored as artifacts.
4. Confirmed patch application with backup.
5. Confirmed Git commit.
6. Confirmed private push.
7. Notifications containing links and statuses, never secrets.

Require tests and log evidence before moving to the next level.
