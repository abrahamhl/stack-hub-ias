import json
import os
from evidence_fabric.capsule import SessionCapsule
from evidence_fabric.redact import Redactor

def _evidence_to_md(evidence_list):
    if not evidence_list:
        return "No evidence provided."
    lines = []
    for ev in evidence_list:
        parts = []
        if ev.git_commit: parts.append(f"Commit: `{ev.git_commit}`")
        if ev.file_path: parts.append(f"File: `{ev.file_path}`")
        if ev.line_range: parts.append(f"Lines: {ev.line_range[0]}-{ev.line_range[1]}")
        if ev.test_result: parts.append(f"Test: {ev.test_result}")
        if parts:
            lines.append(" - " + ", ".join(parts))
    return "\n".join(lines)

def export_public(capsule: SessionCapsule, out_dir: str):
    os.makedirs(out_dir, exist_ok=True)
    redactor = Redactor()

    with open(os.path.join(out_dir, "PUBLIC_ENGINEERING_CASE.md"), "w") as f:
        f.write(f"# Public Engineering Case: {capsule.project}\n\n")
        f.write(f"**Objective**: {redactor.redact_text(capsule.objective)}\n\n")
        f.write("## Verified Claims\n\n")
        for claim in capsule.claims:
            if claim.status == "VERIFIED" and claim.safe_for_public:
                f.write(f"### {claim.category}\n")
                f.write(f"{redactor.redact_text(claim.text)}\n\n")
                f.write("**Evidence**:\n")
                f.write(_evidence_to_md(claim.evidence) + "\n\n")

    with open(os.path.join(out_dir, "RECRUITER_EVIDENCE.md"), "w") as f:
        f.write("# Recruiter Evidence\n\n")
        for claim in capsule.claims:
            if claim.status == "VERIFIED" and claim.safe_for_cv:
                f.write(f"- {redactor.redact_text(claim.text)}\n")
                f.write(f"  *Evidence*: {_evidence_to_md(claim.evidence).strip()}\n")

    with open(os.path.join(out_dir, "ARCHITECTURE_DECISIONS.md"), "w") as f:
        f.write("# Architecture Decisions\n\n")
        for dec in capsule.decisions:
            f.write(f"- **{dec.type}**: {redactor.redact_text(dec.text)}\n")

    with open(os.path.join(out_dir, "AI_WORKFLOW.md"), "w") as f:
        f.write("# AI Workflow\n\n")
        f.write(f"**Agent**: {capsule.agent}\n")
        f.write(f"**Model**: {capsule.model}\n")
        f.write(f"**Provider**: {capsule.provider}\n")
        f.write(f"**Workflows Used**: {', '.join(capsule.workflows_used)}\n")
        f.write(f"**Skills Used**: {', '.join(capsule.skills_used)}\n")

    with open(os.path.join(out_dir, "VERIFICATION_SUMMARY.md"), "w") as f:
        f.write("# Verification Summary\n\n")
        f.write(f"**Tests**: {len(capsule.tests)}\n")
        f.write(f"**Failures**: {len(capsule.failures)}\n")
        f.write(f"**Reverts**: {len(capsule.reverts)}\n")

    with open(os.path.join(out_dir, "LIMITATIONS.md"), "w") as f:
        f.write("# Limitations\n\n")
        for gap in capsule.known_gaps:
             f.write(f"- {redactor.redact_text(gap)}\n")
        for claim in capsule.claims:
            if claim.limitations:
                f.write(f"- [{claim.category}] {redactor.redact_text(claim.limitations)}\n")

def export_handoff(capsule: SessionCapsule, out_dir: str):
    os.makedirs(out_dir, exist_ok=True)
    redactor = Redactor()

    with open(os.path.join(out_dir, "HANDOFF_PACKAGE.md"), "w") as f:
        f.write("# Session Handoff\n\n")
        f.write("## WHERE AM I?\n")
        f.write(f"Project: {capsule.project} / Repo: {capsule.repository}\n")
        f.write(f"Branch: {capsule.branch}\n")
        f.write(f"Commit Range: {capsule.base_commit} -> {capsule.final_commit}\n\n")
        f.write("## WHAT CHANGED?\n")
        f.write("Files Changed:\n")
        for file in capsule.files_changed:
            f.write(f"- {file}\n")
        f.write("\n")
        f.write("## WHY?\n")
        f.write(f"{redactor.redact_text(capsule.objective)}\n\n")
        f.write("## WHAT IS VERIFIED?\n")
        for claim in capsule.claims:
            if claim.status == "VERIFIED":
                 f.write(f"- {redactor.redact_text(claim.text)}\n")
        f.write("\n")
        f.write("## WHAT FAILED?\n")
        for fail in capsule.failures:
            f.write(f"- {redactor.redact_text(fail)}\n")
        f.write("\n")
        f.write("## WHAT MUST NOT BE TOUCHED?\n")
        f.write("- Refer to AGENTS.md / CLAUDE.md / SOUL.md\n\n")
        f.write("## WHAT SHOULD HAPPEN NEXT?\n")
        for action in capsule.next_actions:
            f.write(f"- {redactor.redact_text(action)}\n")
