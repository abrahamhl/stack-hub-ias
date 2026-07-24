import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const moduleUrl = pathToFileURL(
  path.resolve("dist/policy.js"),
).href;

test("policy keeps paths inside roots and blocks secrets", async () => {
  const { resolveInsideRoot } = await import(moduleUrl);
  const rootPath = await mkdtemp(path.join(tmpdir(), "abraham-mcp-policy-"));
  await mkdir(path.join(rootPath, "project"));
  await writeFile(path.join(rootPath, "project", "README.md"), "ok");
  const root = { id: "test", path: rootPath, mode: "read-only" };

  assert.equal(
    resolveInsideRoot(root, "project/README.md"),
    path.join(rootPath, "project", "README.md"),
  );
  assert.throws(() => resolveInsideRoot(root, "../outside.txt"));
  assert.throws(() => resolveInsideRoot(root, ".env"));
  assert.throws(() => resolveInsideRoot(root, ".git/config"));
});
