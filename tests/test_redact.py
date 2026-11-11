import unittest
import os
from evidence_fabric.redact import Redactor

class TestRedact(unittest.TestCase):
    def setUp(self):
        self.redactor = Redactor()
        self.fixture_path = os.path.join(os.path.dirname(__file__), 'fixtures', 'file_with_secrets.md')

    def test_redact_secrets(self):
        with open(self.fixture_path, 'r') as f:
            text = f.read()
        result = self.redactor.redact_secrets(text, self.fixture_path)
        self.assertEqual(result['redacted_count'], 3)
        findings = result['findings']
        types = [f['secret_type'] for f in findings]
        self.assertIn('OpenAI API Key', types)
        self.assertIn('Password Assignment', types)
        self.assertIn('GitHub Token', types)
        for f in findings:
            self.assertTrue(f['redacted'])
            self.assertNotIn('sk-abcdefghijklmnopqrstuvwxyz1234567890', str(f))

    def test_redact_text(self):
        with open(self.fixture_path, 'r') as f:
            text = f.read()
        redacted_text = self.redactor.redact_text(text)
        self.assertNotIn('sk-abcdefghijklmnopqrstuvwxyz1234567890', redacted_text)
        self.assertNotIn('mySuperSecretPassword123!', redacted_text)
        self.assertIn('[OPENAI API KEY REDACTED]', redacted_text)
        self.assertIn('[PASSWORD ASSIGNMENT REDACTED]', redacted_text)

if __name__ == '__main__':
    unittest.main()
