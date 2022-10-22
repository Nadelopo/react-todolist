import { RootState } from '@/redux/store'
import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { IinitialState, Itask } from './types'

export const getAllTasks = createAsyncThunk(
  'Alltasks/getAllTasks',
  async (userId: string) => {
    const { data, error } = await supabase
      .from<Itask>('Tasks')
      .select()
      .eq('userId', userId)
    if (error) console.log(error)
    return { data }
  }
)

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (userId: string) => {
    const { currentCategoryId } = useSelector(
      (state: RootState) => state.categories
    )
    let Data, Error
    if (currentCategoryId) {
      const { data, error } = await supabase
        .from<Itask>('Tasks')
        .select()
        .order('created_at')
        .eq('userId', userId)
        .eq('categoryId', currentCategoryId)
      Data = data
      Error = error
    } else {
      const { data, error } = await supabase
        .from<Itask>('Tasks')
        .select()
        .order('created_at')
        .eq('userId', userId)
      Data = data
      Error = error
    }
    if (Error) console.log(Error)
    //  if (Data) this.tasks = Data.reverse()
    return { Data }
  }
)

const initialState: IinitialState = {
  tasks: [],
  allTasks: [],
}

export const categorieSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.allTasks = action.payload.data
      }
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      if (action.payload.Data) {
        state.tasks = action.payload.Data.reverse()
      }
    })
  },
})

// Action creators are generated for each case reducer function
// export const { setCurrentCategory } = categorieSlice.actions

export default categorieSlice.reducer
