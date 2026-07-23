---
name: auditing-project-readiness
description: Audit a local project for scope, build health, tests, Git safety, deploy configuration, privacy, documentation and actual production readiness. Use when the user asks to audit, sanitize, clean, merge, finish, ship, deploy, score, classify or review one or many projects, or asks whether a repository is ready for GitHub or production.
---

# Audit project readiness

## Inspect without mutating

1. Resolve the exact project root.
2. Read instructions and manifests.
3. Inspect Git status, branch and remotes.
4. Identify build, test, deploy and environment configuration.
5. Scan filenames and known key prefixes without printing secret values.

Use `scripts/inspect-project.ps1` for a repeatable read-only baseline.

## Score

Read [scorecard.md](references/scorecard.md). Score only evidence that exists.
Mark unavailable evidence as `unknown`, not failed.

## Classify every finding

- `P0`: secret exposure, destructive deploy, wrong repository target.
- `P1`: build failure, unsafe authorization, data-loss risk.
- `P2`: broken workflow, missing tests, accessibility failure.
- `P3`: polish, naming or low-impact debt.

## Recommend the smallest ship-ready path

Prefer:

1. remove or quarantine unnecessary scope;
2. repair the build and critical paths;
3. protect private data;
4. add the minimum tests;
5. publish privately;
6. expand only after evidence.

Do not delete, migrate or push merely because an audit recommends it.

## Report

Return:

- readiness score;
- top five problems;
- confirmed-safe artifacts;
- quarantine candidates;
- exact blockers;
- next three actions;
- evidence and checks.
