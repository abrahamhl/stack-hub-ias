import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PolicyRoot } from "./policy.js";

type AuditEvent = {
  actor: string;
  action: string;
  rootId: string;
  target: string;
  result: "success" | "denied" | "error";
  details?: Record<string, unknown>;
};

function safeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "audit-note";
}

export async function appendAuditEvent(
  root: PolicyRoot,
  event: AuditEvent,
): Promise<void> {
  const logDir = path.join(root.path, ".ai-forge", "logs");
  await mkdir(logDir, { recursive: true });
  await appendFile(
    path.join(logDir, "events.ndjson"),
    `${JSON.stringify({
      ...event,
      timestamp: new Date().toISOString(),
      bridgeVersion: "0.1.0",
    })}\n`,
    "utf8",
  );
}

export async function writeAuditNote(
  root: PolicyRoot,
  title: string,
  body: string,
  actor: string,
): Promise<{ path: string }> {
  const auditDir = path.join(root.path, ".ai-forge", "audit");
  await mkdir(auditDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${timestamp}-${safeSlug(title)}.md`;
  const target = path.join(auditDir, filename);
  const content = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `actor: ${JSON.stringify(actor)}`,
    `created_at: ${JSON.stringify(new Date().toISOString())}`,
    "source: abraham-os-mcp",
    "---",
    "",
    `# ${title}`,
    "",
    body.trim(),
    "",
  ].join("\n");
  await writeFile(target, content, { encoding: "utf8", flag: "wx" });
  await appendAuditEvent(root, {
    actor,
    action: "write_audit_note",
    rootId: root.id,
    target,
    result: "success",
  });
  return { path: target };
}
