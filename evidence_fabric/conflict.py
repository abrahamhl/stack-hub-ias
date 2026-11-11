from typing import Dict, Any, List
import subprocess
from datetime import datetime
from evidence_fabric.capsule import SessionCapsule

def _get_commit_timestamp(commit_hash: str) -> int:
    try:
        result = subprocess.run(
            ["git", "show", "-s", "--format=%ct", commit_hash],
            capture_output=True, text=True, check=True
        )
        return int(result.stdout.strip())
    except subprocess.CalledProcessError:
        return 0

def detect_conflicts(capsule_a: SessionCapsule, capsule_b: SessionCapsule) -> List[Dict[str, Any]]:
    conflicts = []
    claims_a_by_cat = {c.category: c for c in capsule_a.claims}
    claims_b_by_cat = {c.category: c for c in capsule_b.claims}

    if capsule_a.provider != capsule_b.provider:
         ts_a = _get_commit_timestamp(capsule_a.final_commit)
         ts_b = _get_commit_timestamp(capsule_b.final_commit)
         likely_current = "CAPSULE_A" if ts_a > ts_b else "CAPSULE_B" if ts_b > ts_a else "UNKNOWN"
         conflicts.append({
             "type": "CONFLICT",
             "field": "provider",
             "CLAIM_A": capsule_a.provider,
             "CLAIM_B": capsule_b.provider,
             "EVIDENCE_A": capsule_a.final_commit,
             "EVIDENCE_B": capsule_b.final_commit,
             "LIKELY_CURRENT": likely_current,
             "REQUIRES_REVIEW": True
         })

    for category, claim_b in claims_b_by_cat.items():
        if category in claims_a_by_cat:
            claim_a = claims_a_by_cat[category]
            if claim_a.text != claim_b.text:
                ts_a = _get_commit_timestamp(capsule_a.final_commit)
                ts_b = _get_commit_timestamp(capsule_b.final_commit)
                likely_current = "CLAIM_A" if ts_a > ts_b else "CLAIM_B" if ts_b > ts_a else "UNKNOWN"
                conflicts.append({
                    "type": "CONFLICT",
                    "category": category,
                    "CLAIM_A": claim_a.text,
                    "CLAIM_B": claim_b.text,
                    "EVIDENCE_A": [e.__dict__ for e in claim_a.evidence],
                    "EVIDENCE_B": [e.__dict__ for e in claim_b.evidence],
                    "LIKELY_CURRENT": likely_current,
                    "REQUIRES_REVIEW": True
                })
    return conflicts
