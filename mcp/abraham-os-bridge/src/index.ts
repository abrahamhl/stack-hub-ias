import { execFile } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { appendAuditEvent, writeAuditNote } from "./audit.js";
import {
  assertAuditWrite,
  findRoot,
  policySchema,
  publicRoot,
  resolveInsideRoot,
} from "./policy.js";

const execFileAsync = promisify(execFile);
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const policyPath =
  process.env.ABRAHAM_MCP_POLICY ??
  path.resolve(moduleDir, "../config/policy.local.json");

const policy = policySchema.parse(
  JSON.parse(await readFile(policyPath, "utf8")),
);

const server = new McpServer(
  {
    name: "abraham-os-bridge",
    version: "0.1.0",
  },
  {
    instructions:
      "Use read-only discovery before requesting any change. Never look for secrets. Write only audit notes in roots marked audit-write. Git push, deletion and arbitrary shell execution are intentionally unavailable.",
  },
);

function textResult(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

function toolError(error: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: error instanceof Error ? error.message : String(error),
      },
    ],
    isError: true,
  };
}

server.registerTool(
  "list_roots",
  {
    title: "List allowed Abraham OS roots",
    description:
      "List the explicitly allowed local roots and whether each is read-only or audit-write.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
  },
  async () => textResult({ roots: policy.roots.map(publicRoot) }),
);

server.registerTool(
  "list_directory",
  {
    title: "List an allowed directory",
    description:
      "List one directory inside an allowed root. Protected directories and secret-looking paths are rejected.",
    inputSchema: z.object({
      rootId: z.string(),
      relativePath: z.string().default("."),
      limit: z.number().int().min(1).max(200).default(100),
    }),
    annotations: { readOnlyHint: true },
  },
  async ({ rootId, relativePath, limit }) => {
    try {
      const root = findRoot(policy, rootId);
      const target = resolveInsideRoot(root, relativePath);
      const entries = (await readdir(target, { withFileTypes: true }))
        .filter(
          (entry) =>
            ![
              ".git",
              "node_modules",
              ".next",
              ".vinext",
              "dist",
              ".wrangler",
            ].includes(entry.name),
        )
        .slice(0, limit)
        .map((entry) => ({
          name: entry.name,
          type: entry.isDirectory()
            ? "directory"
            : entry.isFile()
              ? "file"
              : "other",
        }));
      return textResult({ rootId, relativePath, entries });
    } catch (error) {
      return toolError(error);
    }
  },
);

server.registerTool(
  "read_project_file",
  {
    title: "Read a safe project file",
    description:
      "Read a bounded text file inside an allowed root. Environment files, credentials, keys, Git internals, dependencies and build output are blocked.",
    inputSchema: z.object({
      rootId: z.string(),
      relativePath: z.string().min(1),
    }),
    annotations: { readOnlyHint: true },
  },
  async ({ rootId, relativePath }) => {
    try {
      const root = findRoot(policy, rootId);
      const target = resolveInsideRoot(root, relativePath);
      const info = await stat(target);
      if (!info.isFile()) throw new Error("Target is not a file");
      if (info.size > policy.maxReadBytes) {
        throw new Error(`File exceeds ${policy.maxReadBytes} bytes`);
      }
      const allowedExtensions = new Set([
        ".md",
        ".txt",
        ".json",
        ".yaml",
        ".yml",
        ".toml",
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".css",
        ".html",
        ".csv",
      ]);
      if (!allowedExtensions.has(path.extname(target).toLowerCase())) {
        throw new Error("File type is not allowlisted");
      }
      return textResult({
        rootId,
        relativePath,
        size: info.size,
        content: await readFile(target, "utf8"),
      });
    } catch (error) {
      return toolError(error);
    }
  },
);

server.registerTool(
  "git_status",
  {
    title: "Inspect local Git status",
    description:
      "Return branch, worktree status and configured remotes for one allowed project root. This tool never stages, commits or pushes.",
    inputSchema: z.object({ rootId: z.string() }),
    annotations: { readOnlyHint: true },
  },
  async ({ rootId }) => {
    try {
      const root = findRoot(policy, rootId);
      const target = resolveInsideRoot(root);
      const [{ stdout: statusOutput }, { stdout: remoteOutput }] =
        await Promise.all([
          execFileAsync("git", ["-C", target, "status", "--short", "--branch"], {
            timeout: 10_000,
          }),
          execFileAsync("git", ["-C", target, "remote", "-v"], {
            timeout: 10_000,
          }),
        ]);
      return textResult({
        rootId,
        status: statusOutput.trim(),
        remotes: remoteOutput.trim() || null,
      });
    } catch (error) {
      return toolError(error);
    }
  },
);

server.registerTool(
  "search_project_text",
  {
    title: "Search project text",
    description:
      "Search text inside an allowed root with ripgrep. Dependencies, Git internals, build output, environment files and private key formats are excluded.",
    inputSchema: z.object({
      rootId: z.string(),
      query: z.string().min(2).max(200),
    }),
    annotations: { readOnlyHint: true },
  },
  async ({ rootId, query }) => {
    try {
      const root = findRoot(policy, rootId);
      const target = resolveInsideRoot(root);
      const args = [
        "--line-number",
        "--color",
        "never",
        "--max-count",
        String(policy.maxSearchResults),
        "--glob",
        "!**/.git/**",
        "--glob",
        "!**/node_modules/**",
        "--glob",
        "!**/dist/**",
        "--glob",
        "!**/.env*",
        "--",
        query,
        target,
      ];
      const { stdout } = await execFileAsync("rg", args, {
        timeout: 15_000,
        maxBuffer: 512 * 1024,
      });
      return textResult({
        rootId,
        query,
        matches: stdout
          .split(/\r?\n/)
          .filter(Boolean)
          .slice(0, policy.maxSearchResults),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("Command failed")) {
        return textResult({ rootId, query, matches: [] });
      }
      return toolError(error);
    }
  },
);

server.registerTool(
  "write_audit_note",
  {
    title: "Write an AI Forge audit note",
    description:
      "Create one Markdown audit note inside the dedicated .ai-forge/audit directory of an audit-write root. It cannot overwrite an existing note or write elsewhere.",
    inputSchema: z.object({
      rootId: z.string(),
      title: z.string().min(3).max(120),
      body: z.string().min(1).max(20_000),
      actor: z.string().min(2).max(80),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
  async ({ rootId, title, body, actor }) => {
    const root = findRoot(policy, rootId);
    try {
      assertAuditWrite(root);
      return textResult(await writeAuditNote(root, title, body, actor));
    } catch (error) {
      await appendAuditEvent(root, {
        actor,
        action: "write_audit_note",
        rootId,
        target: ".ai-forge/audit",
        result: "denied",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      }).catch(() => undefined);
      return toolError(error);
    }
  },
);

process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});

await server.connect(new StdioServerTransport());
