import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test("server exposes the bounded Abraham OS tool surface", async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["dist/index.js"],
    env: { ...process.env },
  });
  const client = new Client({
    name: "abraham-os-bridge-test",
    version: "0.1.0",
  });

  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name).sort();
    assert.deepEqual(names, [
      "git_status",
      "list_directory",
      "list_roots",
      "read_project_file",
      "search_project_text",
      "write_audit_note",
    ]);

    const result = await client.callTool({
      name: "list_roots",
      arguments: {},
    });
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.roots[0].id, "ai-forge");
    assert.equal(payload.roots[0].mode, "audit-write");
  } finally {
    await client.close();
  }
});
