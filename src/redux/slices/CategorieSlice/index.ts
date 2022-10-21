import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
}

export const categorieSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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
// export const { increment, decrement, incrementByAmount } = categorieSlice.actions

export default categorieSlice.reducer
