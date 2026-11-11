import re
from typing import List, Dict, Any

class Redactor:
    def __init__(self):
        self.patterns = {
            "OpenAI API Key": r"sk-[a-zA-Z0-9]{20,}",
            "Anthropic API Key": r"sk-ant-[a-zA-Z0-9_-]{20,}",
            "AWS Access Key": r"(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])",
            "OAuth Token": r"ya29\.[a-zA-Z0-9_-]+",
            "Bearer Token": r"Bearer\s+[a-zA-Z0-9_\-\.]+",
            "Private Key": r"-----BEGIN (?:RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----",
            "Password Assignment": r"(?i)password\s*=\s*['\"][^'\"]+['\"]",
            "Env Value": r"(?im)^[A-Z_]+_KEY\s*=\s*['\"]?[^'\"]+['\"]?$",
            "GitHub Token": r"(?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9_]{36,}"
        }

    def redact_secrets(self, text: str, filepath: str = "unknown", line: int = 0) -> Dict[str, Any]:
        """
        Scans the text for secrets. Returns metadata about found secrets,
        but never the secret values themselves.
        """
        findings = []
        for secret_type, pattern in self.patterns.items():
            matches = list(re.finditer(pattern, text))
            if matches:
                # Determine line numbers if text is multi-line
                lines = text.split('\n')
                for match in matches:
                    # Approximation for line number in multi-line string
                    prefix = text[:match.start()]
                    local_line = prefix.count('\n') + 1 + line if line else prefix.count('\n') + 1

                    findings.append({
                        "secret_type": secret_type,
                        "file": filepath,
                        "line": local_line,
                        "redacted": True
                    })
        return {"findings": findings, "redacted_count": len(findings)}

    def redact_text(self, text: str) -> str:
        """
        Returns text with secrets redacted (replaced with [REDACTED]).
        """
        redacted_text = text
        for secret_type, pattern in self.patterns.items():
            redacted_text = re.sub(pattern, f"[{secret_type.upper()} REDACTED]", redacted_text)
        return redacted_text
