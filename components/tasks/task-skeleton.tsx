'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TaskSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-5 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-20 mt-4" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
      </CardFooter>
    </Card>
  )
}

export function TaskListSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-full sm:w-[200px]" />
          <Skeleton className="h-10 w-full sm:w-[200px]" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    </div>
  )
} 