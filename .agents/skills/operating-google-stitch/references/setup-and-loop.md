# Stitch setup and AI Forge loop

## Upstream

Use the Google Labs Code repository:

- Marketplace: `https://github.com/google-labs-code/stitch-skills`
- Stitch documentation: `https://stitch.withgoogle.com/docs/`

The repository describes itself as experimental and not an officially supported Google product. Pin a reviewed revision for production workflows.

## Codex plugin set

Add the marketplace with only these sparse paths:

```text
.agents/plugins
plugins/stitch-design
plugins/stitch-build
plugins/stitch-utilities
```

Then install:

- `stitch-design`
- `stitch-build`
- `stitch-utilities`

The Stitch MCP server and its credentials are separate prerequisites. Store credentials in the client's secret/environment manager, never in Git, Markdown, prompts, or D1.

## Smoke test

Connection is confirmed only when the client can:

1. list owned Stitch projects;
2. inspect a selected project;
3. list its screens;
4. retrieve one screen's metadata without exposing credentials.

Do not generate or overwrite a screen during the smoke test.

## Preferred loop

```text
frontend source
  -> extract DESIGN.md
  -> review tokens and privacy
  -> generate <= 3 variants
  -> select with human
  -> React component handoff
  -> responsive and accessibility checks
  -> Git commit
  -> AI Forge audit event
```
