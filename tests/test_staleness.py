import unittest
from evidence_fabric.staleness import check_staleness

class TestStaleness(unittest.TestCase):
    def test_check_staleness_no_range(self):
        is_stale = check_staleness("evidence_fabric/capsule.py", [], "fake_commit_hash")
        self.assertTrue(is_stale)

    def test_check_staleness_with_range(self):
        is_stale = check_staleness("evidence_fabric/capsule.py", [1, 10], "fake_commit_hash")
        self.assertTrue(is_stale)

if __name__ == '__main__':
    unittest.main()
