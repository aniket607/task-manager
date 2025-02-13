"use client"

import { Project } from '@/lib/db/schema'
import { useProjectStore } from '@/lib/store/useProjectStore'
import { FolderKanban, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId)
  const isSelected = selectedProjectId === project.id

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md w-full",
        isSelected ? "border-primary bg-primary/5 scale-105 shadow-xl dark:shadow-gray-600/60 dark:shadow-lg" : "border-border bg-background",
      )}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3 min-w-0">
          <div className={cn(
            "rounded-lg p-2 shrink-0",
            isSelected ? "bg-primary/10" : "bg-muted"
          )}>
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-foreground truncate">{project.name}</h3>
            {project.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
        </div>
        <ChevronRight 
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform shrink-0 ml-4",
            isSelected ? "rotate-90" : ""
          )} 
        />
      </CardContent>
    </Card>
  )
} 