export interface Itask {
  id: number
  created_at: Date
  title: string
  status: boolean
  categoryId: number
  userId: string
}

export interface IinitialState {
  tasks: Itask[]
  allTasks: Itask[]
}

export interface IaddTaskparams {
  title: string
  categoryId: number
  userId: string
}

export interface IgetTasksParams {
  userId: string
  currentCategoryId: number | null
}
