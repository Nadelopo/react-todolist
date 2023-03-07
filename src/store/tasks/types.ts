export interface Task {
  id: number
  created_at: Date
  title: string
  status: boolean
  categoryId: number
  userId: string
}

export interface CurrentTask {
  id?: number
  title?: string
}

export interface TaskStore {
  tasks: Task[]
  allTasks: Task[]
  setAllTasks: () => Promise<void>
  setTasks: (userId: string) => Promise<void>
  addTask: (title: string, categoryId: number, userId: string) => Promise<void>
  updateTask: (task: CurrentTask) => Promise<void>
  editTaskStatus: (task: Task) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}
