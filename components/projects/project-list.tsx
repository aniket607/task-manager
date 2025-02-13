'use client'

import { useProjects } from '@/lib/hooks/useProjects'
import { ProjectCard } from './project-card'
import { useProjectStore } from '@/lib/store/useProjectStore'
import { ProjectListSkeleton } from './project-skeleton'

export function ProjectList() {
  const { projects, isLoading } = useProjects()
  const toggleSelectedProject = useProjectStore((state) => state.toggleSelectedProject)

  if (isLoading) {
    return <ProjectListSkeleton />
  }

  if (!projects?.length) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No projects found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-0">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => toggleSelectedProject(project.id)}
        />
      ))}
    </div>
  )
} 