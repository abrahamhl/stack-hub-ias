import { desc } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { auditEvents } from "../../../db/schema";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const rows = await getDb()
      .select()
      .from(auditEvents)
      .orderBy(desc(auditEvents.createdAt), desc(auditEvents.id))
      .limit(100);
    return Response.json({ events: rows });
  } catch {
    return Response.json(
      { error: "Audit storage is not initialized yet." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    projectId?: string;
    actor?: string;
    actorRole?: string;
    action?: string;
    risk?: "low" | "medium" | "high" | "critical";
    testStatus?: "not_required" | "pending" | "passed" | "failed";
    evidenceRef?: string;
  };

  if (!payload.actor?.trim() || !payload.actorRole?.trim() || !payload.action?.trim()) {
    return Response.json(
      { error: "actor, actorRole and action are required" },
      { status: 400 },
    );
  }

  try {
    const [event] = await getDb()
      .insert(auditEvents)
      .values({
        projectId: payload.projectId?.trim() || null,
        actor: payload.actor.trim(),
        actorRole: payload.actorRole.trim(),
        action: payload.action.trim(),
        risk: payload.risk ?? "low",
        testStatus: payload.testStatus ?? "pending",
        evidenceRef: payload.evidenceRef?.trim() || null,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return Response.json({ event }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Unable to store the audit event." },
      { status: 500 },
    );
  }
}
