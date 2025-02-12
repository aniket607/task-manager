DROP TABLE "categories";--> statement-breakpoint
DROP TABLE "task_categories";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'TODO';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'MEDIUM';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "due_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "project_id" SET NOT NULL;