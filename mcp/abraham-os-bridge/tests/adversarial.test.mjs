import { mkdtemp, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const moduleUrl = pathToFileURL(
  path.resolve("dist/policy.js"),
).href;

test("Adversarial: Path Traversal", async () => {
  const { resolveInsideRoot } = await import(moduleUrl);
  
  const rootPath = await mkdtemp(path.join(tmpdir(), "adversarial-1-"));
  const root = { id: "test", path: rootPath, mode: "read-write" };

  // 1. Basic dot-dot traversal
  assert.throws(() => resolveInsideRoot(root, "../etc/passwd"), /escapes the allowed root/i);
  
  // 2. Absolute path injection
  assert.throws(() => resolveInsideRoot(root, "/etc/passwd"), /escapes the allowed root/i);
  
  // 3. Encoded traversal
  // 4. Node_modules traversal
  assert.throws(() => resolveInsideRoot(root, "node_modules/something"), /enters a protected directory/i);
});

test("Adversarial: Secret File Access", async () => {
  const { resolveInsideRoot } = await import(moduleUrl);
  const rootPath = await mkdtemp(path.join(tmpdir(), "adversarial-2-"));
  const root = { id: "test", path: rootPath, mode: "read-write" };

  const secrets = [
    ".env",
    "project/.env.local",
    ".git/id_rsa",
    "project/.aws/credentials",
    ".npmrc"
  ];

  for (const secret of secrets) {
    assert.throws(() => resolveInsideRoot(root, secret), /Protected or secret-looking file|enters a protected directory/i, `Should block ${secret}`);
  }
});
