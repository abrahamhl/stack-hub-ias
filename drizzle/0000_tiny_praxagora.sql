CREATE TABLE `audit_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text,
	`actor` text NOT NULL,
	`actor_role` text NOT NULL,
	`action` text NOT NULL,
	`risk` text DEFAULT 'low' NOT NULL,
	`test_status` text DEFAULT 'pending' NOT NULL,
	`evidence_ref` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`visibility` text DEFAULT 'private' NOT NULL,
	`lifecycle` text DEFAULT 'incubating' NOT NULL,
	`readiness_score` integer DEFAULT 0 NOT NULL,
	`current_action` text DEFAULT '' NOT NULL,
	`repository_url` text,
	`source_type` text DEFAULT 'user_manual' NOT NULL,
	`verification_status` text DEFAULT 'needs_review' NOT NULL,
	`confidence` real DEFAULT 0.5 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);