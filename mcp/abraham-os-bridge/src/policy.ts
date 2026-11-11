import { realpathSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

export const rootModeSchema = z.enum(["read-only", "audit-write"]);

export const policySchema = z.object({
  version: z.literal(1),
  maxReadBytes: z.number().int().min(1024).max(1_048_576),
  maxSearchResults: z.number().int().min(1).max(200),
  roots: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        path: z.string().min(3),
        mode: rootModeSchema,
      }),
    )
    .min(1),
});

export type BridgePolicy = z.infer<typeof policySchema>;
export type PolicyRoot = BridgePolicy["roots"][number];

const deniedSegments = new Set([
  ".git",
  "node_modules",
  ".next",
  ".vinext",
  "dist",
  ".wrangler",
  "credentials",
  "secrets",
]);

const deniedFilePatterns = [
  /^\.env(?:\.|$)/i,
  /\.pem$/i,
  /\.key$/i,
  /^id_(?:rsa|ed25519)/i,
  /credential/i,
  /secret/i,
  /^\.npmrc$/i,
];

export function findRoot(policy: BridgePolicy, rootId: string): PolicyRoot {
  const root = policy.roots.find((candidate) => candidate.id === rootId);
  if (!root) {
    throw new Error(`Unknown rootId: ${rootId}`);
  }
  return root;
}

export function resolveInsideRoot(root: PolicyRoot, relativePath = "."): string {
  const rootPath = realpathSync(root.path);
  const candidate = path.resolve(rootPath, relativePath);
  const relative = path.relative(rootPath, candidate);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Path escapes the allowed root");
  }

  const segments = relative.split(path.sep).filter(Boolean);
  if (segments.some((segment) => deniedSegments.has(segment.toLowerCase()))) {
    throw new Error("Path enters a protected directory");
  }

  const filename = segments.at(-1) ?? "";
  if (deniedFilePatterns.some((pattern) => pattern.test(filename))) {
    throw new Error("Protected or secret-looking file");
  }

  return candidate;
}

export function assertAuditWrite(root: PolicyRoot): void {
  if (root.mode !== "audit-write") {
    throw new Error(`Root ${root.id} is read-only`);
  }
}

export function publicRoot(root: PolicyRoot) {
  return {
    id: root.id,
    path: root.path,
    mode: root.mode,
  };
}
