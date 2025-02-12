import { create } from 'zustand';
import { Task } from '@/lib/db/schema';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: {
    status?: string;
    priority?: string;
    search?: string;
  };
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task | null) => void;
  setFilter: (filter: TaskState['filter']) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  selectedTask: null,
  filter: {},
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilter: (filter) => set({ filter }),
})); 