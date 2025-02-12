'use client'

import { useTasks } from "@/lib/hooks/useTasks"
import { useTaskStore } from "@/lib/store/useTaskStore"
import { TaskCard } from "./task-card"
import { TaskFilters } from "./task-filters"
import { TaskDialog } from "./task-dialog"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import { TaskListSkeleton } from "./task-skeleton"

interface TaskListProps {
  projectId?: number
}

export function TaskList({ projectId }: TaskListProps) {
  const { tasks, isLoading } = useTasks()
  const { filter, setSelectedTask, openDialog } = useTaskStore()

  // Filter tasks based on current filter and projectId
  const filteredTasks = tasks?.filter(task => {
    if (projectId && task.projectId !== projectId) return false
    if (filter.status && task.status !== filter.status) return false
    if (filter.priority && task.priority !== filter.priority) return false
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      return task.title.toLowerCase().includes(searchLower) ||
             task.description?.toLowerCase().includes(searchLower)
    }
    return true
  })

  if (isLoading) return <TaskListSkeleton />

  const handleAddTask = () => {
    setSelectedTask({})  // Set an empty task
    openDialog()        // Open the dialog
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={handleAddTask}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskFilters />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
        {filteredTasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <TaskDialog />
    </div>
  )
} 