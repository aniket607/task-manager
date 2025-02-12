import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { tasks } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { auth } from '@/auth'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const awaitedParams = await params;
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    
    // Handle date conversion if dueDate is present
    const updateData = {
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(
        and(
          eq(tasks.id, parseInt(awaitedParams.id)),
          eq(tasks.userId, parseInt(session.user.id))
        )
      )
      .returning()

    // Fetch the updated task with project details
    const taskWithProject = await db.query.tasks.findFirst({
      where: eq(tasks.id, updatedTask.id),
      with: {
        project: true,
      },
    })

    return NextResponse.json(taskWithProject)
  } catch (error) {
    console.error('PATCH task error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const awaitedParams = await params;
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db
      .delete(tasks)
      .where(
        and(
          eq(tasks.id, parseInt(awaitedParams.id)),
          eq(tasks.userId, parseInt(session.user.id))
        )
      )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE task error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 