import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ICategoriesState,
  ICategory,
  IcreateCategory,
  IupdateCategory,
} from './types'

const searchParams = Object.fromEntries(
  new URL(String(window.location)).searchParams.entries()
)

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (userId: string) => {
    const { data, error } = await supabase
      .from<ICategory>('Categories')
      .select()
      .eq('userId', userId)
    if (error) console.log(error)
    return data
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: number) => {
    const { data, error } = await supabase
      .from('Categories')
      .delete()
      .eq('id', categoryId)
    if (error) console.log(error)
    return { data, categoryId }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (params: IupdateCategory) => {
    const { title, currentCategoryId } = params
    const { data, error } = await supabase
      .from<ICategory>('Categories')
      .update({ title })
      .eq('id', currentCategoryId)
    if (error) console.log(error)
    return { data, title, id: currentCategoryId }
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (params: IcreateCategory) => {
    const { title, userId } = params
    const { data, error } = await supabase
      .from<ICategory>('Categories')
      .insert({ title, userId })
      .single()
    if (error) console.log(error)
    return { data }
  }
)

const initialState: ICategoriesState = {
  categories: [],
  currentCategoryId: Number(searchParams.category) || null,
}

export const categorieSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<number | null>) {
      state.currentCategoryId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      if (action.payload?.length) state.categories = action.payload
      else {
        state.categories = []
        state.currentCategoryId = null
      }
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const { data, categoryId } = action.payload
      if (data) {
        state.categories = state.categories.filter((c) => c.id !== categoryId)
      }
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const { data, id, title } = action.payload
      if (data) {
        state.categories = state.categories.map((c) =>
          c.id == id ? { ...c, title: title } : c
        )
      }
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      const { data } = action.payload
      if (data) {
        state.categories.push(data)
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentCategory } = categorieSlice.actions

export default categorieSlice.reducer
