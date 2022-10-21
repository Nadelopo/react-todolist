import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/CategorieSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    categories,
  },
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
