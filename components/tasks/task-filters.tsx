'use client'

import { useTaskStore } from "@/lib/store/useTaskStore"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function TaskFilters() {
  const { filter, setFilter } = useTaskStore()

  return (
    <div className="flex gap-4 mb-6">
      <Input
        placeholder="Search tasks..."
        value={filter.search || ''}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        className="max-w-xs"
      />
      
      <Select
        value={filter.status || "all"}
        onValueChange={(value) => setFilter({ 
          ...filter, 
          status: value === "all" ? undefined : value 
        })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="TODO">Todo</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.priority || "all"}
        onValueChange={(value) => setFilter({ 
          ...filter, 
          priority: value === "all" ? undefined : value 
        })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 