import {
  createOne,
  deleteOne,
  getAllByColumns,
  updateOne
} from '@/utils/queries'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { categoriesStore, ICategory } from './types'

export const useCategoriesStore = create<categoriesStore>(
  devtools(
    (set) => ({
      categories: [],
      currentCategoryId: null,
      setCategories: async (userId: string) => {
        const data = await getAllByColumns<ICategory>('Categories', [
          { column: 'userId', value: userId }
        ])
        if (data) set({ categories: data })
      },
      createCategory: async (title: string, userId: string) => {
        const data = await createOne<ICategory>('Categories', { title, userId })
        if (data) {
          set((state) => ({ categories: [...state.categories, data] }))
        }
      },
      updateCategory: async (title: string, id: number) => {
        const data = await updateOne<ICategory>('Categories', { title }, id)
        if (data) {
          set((state) => ({
            categories: [
              ...state.categories.map((cat) =>
                cat.id == data.id ? { ...cat, title: data.title } : cat
              )
            ]
          }))
        }
      },
      deleteCategory: async (categoryId: number) => {
        const data = await deleteOne<ICategory>('Categories', categoryId)
        if (data) {
          set((state) => ({
            categories: [
              ...state.categories.filter((cat) => cat.id !== data.id)
            ]
          }))
        }
      }
    }),
    { name: 'categories' }
  )
)
