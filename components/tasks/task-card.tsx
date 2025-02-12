'use client'

import { Task } from "@/lib/db/schema"
import { useTaskStore } from "@/lib/store/useTaskStore"
import { useTasks } from "@/lib/hooks/useTasks"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Loader2 } from "lucide-react"

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  HIGH: "bg-red-100 text-red-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  LOW: "bg-green-100 text-green-800",
}

const statusColors = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks()
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{task.title}</span>
          <Badge className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </CardTitle>
        {task.project && (
          <Badge variant="outline" className="mt-2">
            {task.project.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.description}
        </p>
        <Badge className={`mt-2 ${statusColors[task.status]}`}>
          {task.status}
        </Badge>
      </CardContent>
      <CardFooter className="gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedTask(task)}
          disabled={deleteTask.isPending}
        >
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => deleteTask.mutate(task.id)}
          disabled={deleteTask.isPending}
        >
          {deleteTask.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 