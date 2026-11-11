import unittest
import os
import json
from evidence_fabric.cli import load_capsule
from evidence_fabric.conflict import detect_conflicts

class TestConflict(unittest.TestCase):
    def setUp(self):
        self.fixtures_dir = os.path.join(os.path.dirname(__file__), 'fixtures')
        self.capsule_a = load_capsule(os.path.join(self.fixtures_dir, 'capsule_conflict_a.json'))
        self.capsule_b = load_capsule(os.path.join(self.fixtures_dir, 'capsule_conflict_b.json'))

    def test_detect_conflicts(self):
        conflicts = detect_conflicts(self.capsule_a, self.capsule_b)
        self.assertEqual(len(conflicts), 2)
        provider_conflict = next(c for c in conflicts if c.get("field") == "provider")
        self.assertEqual(provider_conflict["CLAIM_A"], "Ollama fallback")
        self.assertEqual(provider_conflict["CLAIM_B"], "Google Vision only")
        self.assertTrue(provider_conflict["REQUIRES_REVIEW"])
        claim_conflict = next(c for c in conflicts if c.get("category") == "Architecture")
        self.assertEqual(claim_conflict["CLAIM_A"], "Provider is Ollama")
        self.assertEqual(claim_conflict["CLAIM_B"], "Provider is Google Vision")

if __name__ == '__main__':
    unittest.main()
