import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  visibility: text("visibility", {
    enum: ["private", "internal", "public"],
  })
    .notNull()
    .default("private"),
  lifecycle: text("lifecycle", {
    enum: ["ship_now", "next", "incubating", "blocked", "archived"],
  })
    .notNull()
    .default("incubating"),
  readinessScore: integer("readiness_score").notNull().default(0),
  currentAction: text("current_action").notNull().default(""),
  repositoryUrl: text("repository_url"),
  sourceType: text("source_type", {
    enum: ["official", "user_manual", "imported", "review", "inferred"],
  })
    .notNull()
    .default("user_manual"),
  verificationStatus: text("verification_status", {
    enum: ["verified", "needs_review", "stale", "subjective"],
  })
    .notNull()
    .default("needs_review"),
  confidence: real("confidence").notNull().default(0.5),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const auditEvents = sqliteTable("audit_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: text("project_id").references(() => projects.id),
  actor: text("actor").notNull(),
  actorRole: text("actor_role").notNull(),
  action: text("action").notNull(),
  risk: text("risk", {
    enum: ["low", "medium", "high", "critical"],
  })
    .notNull()
    .default("low"),
  testStatus: text("test_status", {
    enum: ["not_required", "pending", "passed", "failed"],
  })
    .notNull()
    .default("pending"),
  evidenceRef: text("evidence_ref"),
  createdAt: text("created_at").notNull(),
});
