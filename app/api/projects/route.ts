import { desc } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message.includes("no such table")) {
    return "Projects storage is not initialized yet.";
  }
  return message;
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const rows = await getDb()
      .select()
      .from(projects)
      .orderBy(desc(projects.updatedAt))
      .limit(100);
    return Response.json({ projects: rows });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      id?: string;
      name?: string;
      slug?: string;
      currentAction?: string;
    };
    const id = payload.id?.trim() ?? "";
    const name = payload.name?.trim() ?? "";
    const slug = payload.slug?.trim() ?? "";

    if (!id || !name || !slug) {
      return Response.json(
        { error: "id, name and slug are required" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const [project] = await getDb()
      .insert(projects)
      .values({
        id,
        name,
        slug,
        currentAction: payload.currentAction?.trim() ?? "",
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return Response.json({ project }, { status: 201 });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
