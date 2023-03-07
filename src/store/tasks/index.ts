import {
  createOne,
  deleteOne,
  getAllByColumns,
  updateOne
} from '@/utils/queries'
import create from 'zustand'
import { useCategoriesStore } from '../categories'
import { useUserStore } from '../user'
import { CurrentTask, Task, TaskStore } from './types'

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  allTasks: [],
  setAllTasks: async () => {
    const userId = useUserStore.getState().userId
    const data = await getAllByColumns<Task>('Tasks', [
      {
        column: 'userId',
        value: userId
      }
    ])
    if (data) {
      set({ allTasks: data })
    }
  },
  setTasks: async (userId: string) => {
    const currentCategoryId = useCategoriesStore.getState().currentCategoryId
    const data = await getAllByColumns<Task>('Tasks', [
      { column: 'userId', value: userId },
      { column: 'categoryId', value: currentCategoryId }
    ])
    if (data) set({ tasks: data.reverse() })
  },
  addTask: async (title: string, categoryId: number, userId: string) => {
    const data = await createOne<Task>('Tasks', {
      title,
      categoryId,
      userId
    })
    if (data) {
      const setAllTasks = useTaskStore.getState().setAllTasks
      const setTasks = useTaskStore.getState().setTasks
      setAllTasks()
      setTasks(userId)
    }
  },
  updateTask: async (task: CurrentTask) => {
    if (task.id) {
      const data = await updateOne<Task>(
        'Tasks',
        { title: task.title },
        task.id
      )
      if (data) {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === task.id ? { ...t, title: data.title } : t
          )
        }))
      }
    }
  },
  editTaskStatus: async (task: Task) => {
    const data = await updateOne<Task>(
      'Tasks',
      { status: !task.status },
      task.id
    )

    if (data) {
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id == task.id ? { ...t, status: data.status } : t
        )
      }))
      const setAllTasks = useTaskStore.getState().setAllTasks
      setAllTasks()
    }
  },
  deleteTask: async (id: number) => {
    const data = await deleteOne<Task>('Tasks', id)
    if (data) {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      }))
      const setAllTasks = useTaskStore.getState().setAllTasks
      setAllTasks()
    }
  }
}))
