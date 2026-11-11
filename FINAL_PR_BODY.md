feat: add provider-neutral Session Evidence Fabric

Problem Solved: Context loss and fragmentation between coding agents (Claude, Codex, etc.).
Architecture: Normalizes artifacts via a standard capsule, detecting conflicts/staleness, redacting secrets, and exporting handoffs.
Files Added: docs/evidence-fabric/*, schemas/session-capsule-v1.schema.json, evidence_fabric/*, tests/*, scripts/dogfood.sh, .skills/session-capsule.md
Files Modified: .gitignore
Test Commands + Results: `python -m unittest discover tests/` (Ran 7 tests in 0.029s, OK) and `scripts/dogfood.sh` (Completed without error).
Security/Redaction Model: Regex-based redaction of common secrets prior to any export. Only safe metadata is written to output logs.
.gitignore Decisions: Original privacy configuration completely preserved. Appended safe rules (build/, __pycache__/, *.pyc) without disrupting prior state.
Known Limitations: Staleness detection uses file-level diff heuristics, lacking deep NLP analysis. Secret redaction may yield false positives.
No External Dependencies: Used only Python standard library.
Exact Base SHA: bca9e4f20e49a87421e06e7f6f9c2b67ff6db0a9
Exact Final SHA: 43ff73879814379a10b0188dc06c40b3aa9d4fb4
