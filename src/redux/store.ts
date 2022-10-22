import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/CategorieSlice'
import tasks from './slices/TaskSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    categories,
    tasks,
  },
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
