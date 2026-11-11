import unittest
import os
import tempfile
import shutil
from evidence_fabric.cli import load_capsule
from evidence_fabric.export import export_public, export_handoff

class TestExport(unittest.TestCase):
    def setUp(self):
        self.fixtures_dir = os.path.join(os.path.dirname(__file__), 'fixtures')
        self.capsule = load_capsule(os.path.join(self.fixtures_dir, 'capsule_good.json'))
        self.test_dir = tempfile.mkdtemp()

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_export_public(self):
        export_public(self.capsule, self.test_dir)
        expected_files = [
            "PUBLIC_ENGINEERING_CASE.md",
            "RECRUITER_EVIDENCE.md",
            "ARCHITECTURE_DECISIONS.md",
            "AI_WORKFLOW.md",
            "VERIFICATION_SUMMARY.md",
            "LIMITATIONS.md"
        ]
        for file in expected_files:
            self.assertTrue(os.path.exists(os.path.join(self.test_dir, file)))
        with open(os.path.join(self.test_dir, "RECRUITER_EVIDENCE.md"), 'r') as f:
            content = f.read()
            self.assertIn("Implemented python data classes", content)
            self.assertIn("1a2b3c4d", content)

    def test_export_handoff(self):
        export_handoff(self.capsule, self.test_dir)
        self.assertTrue(os.path.exists(os.path.join(self.test_dir, "HANDOFF_PACKAGE.md")))
        with open(os.path.join(self.test_dir, "HANDOFF_PACKAGE.md"), 'r') as f:
            content = f.read()
            self.assertIn("jules/session-evidence-fabric", content)
            self.assertIn("Build evidence fabric", content)

if __name__ == '__main__':
    unittest.main()
