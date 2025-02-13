'use client'

import { ProjectList } from '@/components/projects/project-list'
import { TaskList } from '@/components/tasks/task-list'
import { useProjectStore } from '@/lib/store/useProjectStore'
import { useProjects } from '@/lib/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { ProjectDialog } from '@/components/projects/project-dialog'
import { useState } from 'react'

export default function ProjectsPage() {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId)
  const { projects } = useProjects()
  const selectedProject = projects?.find(p => p.id === selectedProjectId)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Select a project to view its tasks</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} size="sm" className="sm:size-default">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="space-y-8">
        <ProjectList />
        
        {selectedProjectId && (
          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              {selectedProject?.name || 'Project'} Tasks
            </h2>
            <TaskList projectId={selectedProjectId} />
          </div>
        )}
      </div>

      <ProjectDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
} 