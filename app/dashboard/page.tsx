'use client'

import { TaskList } from "@/components/tasks/task-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Manage all your tasks in one place</p>
      </div>

      <div className="space-y-8">
        <TaskList />
      </div>
    </div>
  )
}