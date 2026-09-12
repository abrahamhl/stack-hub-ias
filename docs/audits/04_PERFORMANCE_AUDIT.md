# Performance & Systems Audit

## Perspective: Performance Engineer
**Focus:** Memory footprint, event loop blocking, CPU cache utilization.

### Findings
1. **I/O Bottlenecks:** Directory listing in the MCP bridge reads synchronously (fs.readdirSync), blocking the event loop on large directories.
2. **Bundle Size:** React Server Components (RSC) usage reduces client bundle size effectively.

### Action Items
- [x] Migrate fs.*Sync to fs.promises.* in high-throughput bridge routes.
