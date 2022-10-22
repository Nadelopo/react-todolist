import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/CategorieSlice'
import tasks from './slices/TaskSlice'
import { useDispatch } from 'react-redux'
import userSlice from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    categories,
    tasks,
    userSlice,
  },
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
