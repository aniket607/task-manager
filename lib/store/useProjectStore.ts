import { create } from 'zustand'
import { Project } from '@/lib/db/schema'

interface ProjectStore {
  projects: Project[]
  selectedProjectId: number | null
  setProjects: (projects: Project[]) => void
  setSelectedProject: (projectId: number | null) => void
  toggleSelectedProject: (projectId: number) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProjectId: null,
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
  toggleSelectedProject: (projectId) => 
    set((state) => ({ 
      selectedProjectId: state.selectedProjectId === projectId ? null : projectId 
    })),
})) 