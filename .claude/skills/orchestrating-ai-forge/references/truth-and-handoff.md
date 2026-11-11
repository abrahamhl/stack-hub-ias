# Truth and handoff contract

## Truth states

- `verified`: backed by a current primary source or direct inspection.
- `needs_review`: plausible but not confirmed for the current state.
- `stale`: previously true but older than its review window.
- `subjective`: a personal rating, preference or editorial judgment.

Never render `unknown` as zero, inactive or unavailable.

## Handoff payload

Every operator handoff must state:

```yaml
mission_id:
project_id:
requested_outcome:
scope_in:
scope_out:
confirmed_facts:
open_questions:
files_or_urls:
changes_made:
checks_run:
risks:
next_action:
next_owner:
```

Exclude secrets, full chat transcripts and unrelated personal context. Link to
evidence instead of embedding it when the receiving client can access the same
resource.

## Publication boundary

Classify every artifact:

- `public`: safe for portfolio or open source.
- `internal`: team-visible but not public.
- `private`: personal, contractual, billing, credentials, NSFW identity or raw
  memory.

GitHub synchronization does not imply public visibility. Default new Abraham OS
control-plane repositories to private until a publication audit passes.
