import subprocess
from typing import List, Optional

def check_staleness(file_path: str, line_range: List[int], final_commit: str) -> bool:
    """
    Checks if a given file and line range has been modified since the `final_commit`.
    Returns True if stale (modified), False if not stale.
    """
    if not line_range or len(line_range) != 2:
        # If no specific line range, check if file changed since final_commit
        try:
            result = subprocess.run(
                ["git", "diff", "--name-only", f"{final_commit}..HEAD"],
                capture_output=True, text=True, check=True
            )
            return file_path in result.stdout
        except subprocess.CalledProcessError:
             # If git command fails, err on the side of caution or assume it's untrackable
            return True

    start_line, end_line = line_range
    try:
        # Let's check if the file was touched in any commit between final_commit and HEAD
        result = subprocess.run(
             ["git", "log", f"{final_commit}..HEAD", "--oneline", "--", file_path],
             capture_output=True, text=True, check=True
        )
        if result.stdout.strip():
            return True
        return False
    except subprocess.CalledProcessError:
        return True
