import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userTasks = await db.query.tasks.findMany({
      where: eq(tasks.userId, parseInt(session.user.id)),
      orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
      with: {
        project: true, 
      },
    });

    return NextResponse.json(userTasks);
  } catch (error) {
    console.error('GET tasks error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    if (!body.title || !body.projectId) {
      return NextResponse.json({ 
        error: 'Title and project are required' 
      }, { status: 400 });
    }

    const [newTask] = await db.insert(tasks)
      .values({
        title: body.title,
        description: body.description || null,
        status: body.status || 'TODO',
        priority: body.priority || 'MEDIUM',
        dueDate: new Date(body.dueDate),
        projectId: body.projectId,
        userId: parseInt(session.user.id),
      })
      .returning();

    // Fetch the task with project details
    const taskWithProject = await db.query.tasks.findFirst({
      where: eq(tasks.id, newTask.id),
      with: {
        project: true,
      },
    });

    return NextResponse.json(taskWithProject);
  } catch (error) {
    console.error('POST task error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 