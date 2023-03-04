export interface Itask {
  id: number
  created_at: Date
  title: string
  status: boolean
  categoryId: number
  userId: string
}

export interface IcurrentTask {
  id?: number
  title?: string
}

export interface taskStore {
  tasks: Itask[]
  allTasks: Itask[]
  setAllTasks: () => Promise<void>
  setTasks: (userId: string) => Promise<void>
  addTask: (title: string, categoryId: number, userId: string) => Promise<void>
  updateTask: (task: IcurrentTask) => Promise<void>
  editTaskStatus: (task: Itask) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}
