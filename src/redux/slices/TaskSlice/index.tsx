import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IaddTaskparams, IgetTasksParams, IinitialState, Itask } from './types'

export const getAllTasks = createAsyncThunk(
  'Alltasks/getAllTasks',
  async (userId: string) => {
    const { data, error } = await supabase
      .from<Itask>('Tasks')
      .select()
      .eq('userId', userId)
    if (error) console.log(error)
    return data
  }
)

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (params: IgetTasksParams) => {
    const { userId, currentCategoryId } = params
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
    return Data
  }
)

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (params: IaddTaskparams) => {
    const { title, categoryId, userId } = params
    const { data, error } = await supabase
      .from<Itask>('Tasks')
      .insert({
        title,
        categoryId,
        userId,
      })
      .single()
    if (error) console.log(error)
    return { data, categoryId }
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
      if (action.payload) state.allTasks = action.payload
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      if (action.payload) state.tasks = action.payload.reverse()
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      const searchParams = Object.fromEntries(
        new URL(String(window.location)).searchParams.entries()
      )
      const { data, categoryId } = action.payload
      if (data) {
        state.allTasks.push(data)
        if (
          searchParams.category == String(categoryId) ||
          !searchParams.category
        ) {
          state.tasks.unshift(data)
        }
      }
    })
  },
})

// Action creators are generated for each case reducer function
// export const { setCurrentCategory } = categorieSlice.actions

export default categorieSlice.reducer
