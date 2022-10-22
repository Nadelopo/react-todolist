import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategoriesState, ICategory } from './types'

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const { data, error } = await supabase
      .from<ICategory>('Categories')
      .select()
    if (error) console.log(error)
    return { data }
  }
)

const initialState: ICategoriesState = {
  categories: [],
  currentCategoryId: null,
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
      if (action.payload.data) {
        state.categories = action.payload.data
        console.log(state.categories)
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentCategory } = categorieSlice.actions

export default categorieSlice.reducer
