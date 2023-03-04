import {
  createOne,
  deleteOne,
  getAllByColumns,
  updateOne
} from '@/utils/queries'
import create from 'zustand'
import { useCategoriesStore } from '../categories'
import { useUserStore } from '../user'
import { IcurrentTask, Itask, taskStore } from './types'

export const useTaskStore = create<taskStore>((set) => ({
  tasks: [],
  allTasks: [],
  setAllTasks: async () => {
    const userId = useUserStore.getState().userId
    const data = await getAllByColumns<Itask>('Tasks', [
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
    const data = await getAllByColumns<Itask>('Tasks', [
      { column: 'userId', value: userId },
      { column: 'categoryId', value: currentCategoryId }
    ])
    if (data) set({ tasks: data.reverse() })
  },
  addTask: async (title: string, categoryId: number, userId: string) => {
    const data = await createOne<Itask>('Tasks', {
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
  updateTask: async (task: IcurrentTask) => {
    if (task.id) {
      const data = await updateOne<Itask>(
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
  editTaskStatus: async (task: Itask) => {
    const data = await updateOne<Itask>(
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
    const data = await deleteOne<Itask>('Tasks', id)
    if (data) {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      }))
      const setAllTasks = useTaskStore.getState().setAllTasks
      setAllTasks()
    }
  }
}))
