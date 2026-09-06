# .gitignore Safety Review

RULE: `build/`, `__pycache__/`, `*.pyc`
ORIGINAL PURPOSE: There was no rule for these specific Python/build artifacts as the repo primarily focused on JS/TS, though it did have node_modules/ etc. The original `.gitignore` was incorrectly overwritten completely in an earlier commit.
YOUR CHANGE: Restored the original `.gitignore` from `hyper-boost` (commit `bca9e4f`) and explicitly appended rules for `build/`, `__pycache__/`, and `*.pyc` at the end.
WHY NEEDED: To prevent compiled Python files and `build/` directories (used by the dogfood script) from being accidentally committed, while strictly preserving all original privacy protections (like `.env`, `.ai-forge`, `.skills` local content).
SECURITY IMPACT: Zero negative security impact. It strictly restores existing protections and adds new narrow exclusions for non-sensitive auto-generated artifacts.
FINAL DECISION: Approved. The original file has been fully restored with non-intrusive appendages.
