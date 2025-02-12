import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userProjects = await db.query.projects.findMany({
      where: eq(projects.userId, parseInt(session.user.id)),
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    })

    return NextResponse.json(userProjects)
  } catch (error) {
    console.error('GET projects error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const [newProject] = await db.insert(projects)
      .values({
        name: body.name,
        description: body.description || null,
        userId: parseInt(session.user.id),
      })
      .returning()

    return NextResponse.json(newProject)
  } catch (error) {
    console.error('POST project error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 