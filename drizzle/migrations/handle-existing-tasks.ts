import { sql } from 'drizzle-orm'

export async function up(db) {
  // First create a default project for existing tasks
  const [defaultProject] = await db.insert(projects)
    .values({
      name: 'Default Project',
      description: 'Auto-created for existing tasks',
    })
    .returning()

  // Update any tasks with null projectId to use the default project
  await db.update(tasks)
    .set({ projectId: defaultProject.id })
    .where(sql`project_id IS NULL`)

  // Now we can safely make projectId required
  await db.alterTable('tasks')
    .alterColumn('project_id')
    .setNotNull()
} 