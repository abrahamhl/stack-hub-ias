# Google Stitch loop

Use Stitch as an upstream design exploration and handoff surface, not as the
source of runtime authority.

## Setup

- Marketplace: `https://github.com/google-labs-code/stitch-skills`
- Documentation: `https://stitch.withgoogle.com/docs/`
- Treat the repository as experimental; pin a reviewed revision.
- The Stitch MCP server and credentials are separate prerequisites.
- Store credentials in the client's secret manager or environment, never in
  Git, Markdown, prompts, screenshots, D1, or generated design files.

## Read-only smoke test

Connection is confirmed only when the client can:

1. list owned Stitch projects;
2. inspect one explicitly selected project;
3. list its screens;
4. read one screen's metadata without exposing credentials.

Do not generate, overwrite, share, or delete a screen during the smoke test.

## Preferred loop

```text
brief and existing frontend
  -> extract design tokens and constraints
  -> sanitize private content
  -> generate no more than three comparable directions
  -> human selects one
  -> export React-oriented structure
  -> integrate into the existing design system
  -> responsive, accessibility and performance gates
  -> reviewed Git commit
  -> AI Forge audit event
```

## Failure rule

If the MCP server is unavailable, continue with a local design brief and tokens.
Do not invent a successful connection and do not block core frontend work.
