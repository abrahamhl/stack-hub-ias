from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class Evidence:
    git_commit: Optional[str] = None
    file_path: Optional[str] = None
    line_range: Optional[List[int]] = None
    test_result: Optional[str] = None
    CI_run: Optional[str] = None
    deployment: Optional[str] = None
    screenshot: Optional[str] = None
    benchmark: Optional[str] = None
    external_source: Optional[str] = None

@dataclass
class Claim:
    claim_id: str
    text: str
    category: str
    status: str
    evidence: List[Evidence]
    origin: str
    confidence: float
    safe_for_public: bool
    safe_for_cv: bool
    limitations: str

@dataclass
class Decision:
    type: str
    text: str

@dataclass
class SessionCapsule:
    session_id: str
    project: str
    repository: str
    base_commit: str
    final_commit: str
    branch: str
    agent: str
    model: str
    provider: str
    started_at: str
    ended_at: str
    objective: str
    files_read: List[str]
    files_changed: List[str]
    commits: List[str]
    decisions: List[Decision]
    commands: List[str]
    tests: List[str]
    failures: List[str]
    reverts: List[str]
    deployments: List[str]
    artifacts: List[str]
    skills_used: List[str]
    skills_created: List[str]
    workflows_used: List[str]
    workflows_created: List[str]
    claims: List[Claim]
    known_gaps: List[str]
    next_actions: List[str]
