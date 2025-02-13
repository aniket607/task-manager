import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Project } from '@/lib/db/schema'
import { useProjectStore } from '@/lib/store/useProjectStore'

async function getProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}

async function createProject(data: { name: string; description?: string }): Promise<Project> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to create project')
  }
  return response.json()
}

export function useProjects() {
  const queryClient = useQueryClient()
  const { setProjects } = useProjectStore()

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    onSuccess: (data) => {
      setProjects(data)
    },
  })

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    error: projectsQuery.error,
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
  }
} 