# Systems Architecture Audit

## Perspective: Principal Architect
**Focus:** Modularity, separation of concerns, API contracts, domain-driven design.

### Findings
1. **Coupling:** The React UI is tightly coupled to Drizzle ORM schemas in some routes.
2. **Offline-First:** MCP bridge operates entirely locally, which is excellent for latency and privacy.
3. **Extensibility:** The tool registry relies on hardcoded switch statements rather than a plugin loader.

### Action Items
- [x] Abstract Database queries into repository classes.
- [ ] Implement an inversion-of-control (IoC) pattern for MCP tool registration.
