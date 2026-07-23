# Readiness scorecard

Score each category from 0 to 5, then multiply by its weight.

| Category | Weight | Gate |
|---|---:|---|
| Scope and ownership | 10% | One outcome and owner exist |
| Build and type safety | 15% | Production build passes |
| Tests and critical path | 15% | Core journey is exercised |
| Security and privacy | 20% | No secrets or private exports |
| Git and provenance | 10% | Diff, branch and remote are understood |
| Deployment | 10% | Target and rollback are explicit |
| UX and accessibility | 10% | Keyboard, mobile and reduced motion pass |
| Operations and handoff | 10% | Logs, next action and owner exist |

## Status

- 90–100: ship-ready after final human review.
- 75–89: private preview ready.
- 50–74: working prototype; do not market as production.
- 25–49: fragmented or risky.
- 0–24: archive, quarantine or rediscover scope.

Any P0 caps the total at 49 until resolved.
