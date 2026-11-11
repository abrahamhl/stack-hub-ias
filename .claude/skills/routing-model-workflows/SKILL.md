---
name: routing-model-workflows
description: Route work across cloud models, subscriptions, APIs, local models and agents according to evidence needs, privacy, tool access, latency, cost, credits and review risk. Use when selecting a model, changing providers mid-workflow, conserving credits, designing fallbacks, benchmarking personal outcomes, or coordinating Codex, Claude, Gemini, Grok, Manus, Perplexity, OpenRouter, NVIDIA NIM, Ollama or LM Studio.
---

# Route model workflows

## Classify the task

Capture:

- artifact and acceptance criteria;
- privacy level;
- need for current sources;
- required tools;
- context size;
- deadline;
- acceptable cost;
- consequence of an incorrect answer.

## Select a route

Read [router-policy.md](references/router-policy.md). Choose the smallest route
that can meet the acceptance criteria.

Do not use a second model when a deterministic check is enough.

## Track provenance

For every hop record:

`provider`, `surface`, `model`, `account_class`, `input_artifacts`,
`output_artifacts`, `usage_source`, `estimated_cost`, `verification_status`,
`started_at`, `finished_at`.

Never mix web subscription limits with API billing.

## Handoff efficiently

Send:

- compact task state;
- links or paths to evidence;
- unresolved questions;
- exact requested action;
- expected output format.

Do not resend the entire conversation when a short state packet is sufficient.

## Review

Use independent review for high-risk changes. A review model must inspect the
artifact or diff, not merely the first model's summary.
