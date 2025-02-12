import { create } from 'zustand';
import { Task } from '@/lib/db/schema';

interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  isDialogOpen: boolean;
  filter: {
    status?: string;
    priority?: string;
    search?: string;
  };
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Partial<Task> | null) => void;
  setFilter: (filter: TaskStore['filter']) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTask: null,
  isDialogOpen: false,
  filter: {},
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (task) => set({ selectedTask: task as Task | null }),
  setFilter: (filter) => set({ filter }),
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false, selectedTask: null }),
})); 