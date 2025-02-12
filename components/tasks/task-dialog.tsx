'use client'

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Task } from "@/lib/db/schema"
import { useTaskStore } from "@/lib/store/useTaskStore"
import { useTasks } from "@/lib/hooks/useTasks"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format, addDays } from "date-fns"
import { ProjectSelect } from "@/components/projects/project-select"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  projectId: z.number({
    required_error: "Project is required",
  }),
})

type TaskFormValues = z.infer<typeof taskSchema>

export function TaskDialog() {
  const { selectedTask, setSelectedTask } = useTaskStore()
  const { createTask, updateTask } = useTasks()

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: new Date(),
      projectId: undefined,
    },
  })

  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask.title,
        description: selectedTask.description || "",
        status: selectedTask.status as any,
        priority: selectedTask.priority as any,
        dueDate: selectedTask.dueDate ? new Date(selectedTask.dueDate) : undefined,
        projectId: selectedTask.projectId,
      })
    } else {
      form.reset({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date(),
        projectId: undefined,
      })
    }
  }, [selectedTask, form])

  // Function to handle dialog close
  const handleClose = () => {
    setSelectedTask(null)
    form.reset()
  }

  const onSubmit = async (data: TaskFormValues) => {
    try {
      const formData = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
        projectId: data.projectId,
      };

      if (selectedTask) {
        await updateTask.mutateAsync({
          id: selectedTask.id,
          ...formData,
        });
      } else {
        await createTask.mutateAsync(formData);
      }
      handleClose() // Close dialog after successful submission
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Dialog 
      open={selectedTask !== null}
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedTask ? "Edit Task" : "Create Task"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">Todo</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-full pl-3 text-left font-normal">
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                        defaultMonth={field.value || new Date()}
                        fromDate={new Date()}
                        toDate={addDays(new Date(), 365)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <ProjectSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={createTask.isPending || updateTask.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createTask.isPending || updateTask.isPending}
              >
                {(createTask.isPending || updateTask.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {selectedTask ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 