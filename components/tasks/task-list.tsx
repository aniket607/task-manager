'use client'

import { useTasks } from "@/lib/hooks/useTasks"
import { useTaskStore } from "@/lib/store/useTaskStore"
import { TaskCard } from "./task-card"
import { TaskFilters } from "./task-filters"
import { TaskDialog } from "./task-dialog"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"

export function TaskList() {
  const { tasks, isLoading } = useTasks()
  const { filter, setSelectedTask } = useTaskStore()

  // Filter tasks based on current filter
  const filteredTasks = tasks?.filter(task => {
    if (filter.status && task.status !== filter.status) return false
    if (filter.priority && task.priority !== filter.priority) return false
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      return task.title.toLowerCase().includes(searchLower) ||
             task.description?.toLowerCase().includes(searchLower)
    }
    return true
  })

  if (isLoading) return <div>Loading tasks...</div>

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button
          onClick={() => setSelectedTask(null)}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskFilters />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <TaskDialog />
    </div>
  )
} 