import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICurrentCategory } from '../CategorieSlice/types'
import { IaddTaskparams, IgetTasksParams, IinitialState, Itask } from './types'

export const getAllTasks = createAsyncThunk(
  'Alltasks/getAllTasks',
  async (userId: string) => {
    if (!userId) return null
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
    if (!userId) return null
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

export const editTaskStatus = createAsyncThunk(
  'tasks/editTaskStatus',
  async (task: Itask) => {
    const { data, error } = await supabase
      .from<Itask>('Tasks')
      .update({ status: !task.status })
      .eq('id', task.id)
      .single()

    if (error) console.log(error)
    return { data, taskId: task.id }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    const { data, error } = await supabase
      .from<Itask>('Tasks')
      .delete()
      .eq('id', id)
      .single()
    if (error) console.log(error)
    return { data, taskId: id }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: ICurrentCategory) => {
    let data
    if (task.id) {
      const { data: dataReq, error } = await supabase
        .from<Itask>('Tasks')
        .update({ title: task.title })
        .eq('id', task.id)
        .single()
      if (error) console.log(error)
      data = dataReq
    }
    return { data, taskId: task.id }
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
      else state.allTasks = []
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      if (action.payload) state.tasks = action.payload.reverse()
      else state.tasks = []
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
    builder.addCase(editTaskStatus.fulfilled, (state, action) => {
      const { data, taskId } = action.payload
      if (data) {
        state.tasks = state.tasks.map((t) =>
          t.id == taskId ? { ...t, status: data.status } : t
        )
      }
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { data, taskId } = action.payload
      if (data) {
        state.tasks = state.tasks.filter((t) => t.id !== taskId)
      }
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const { data, taskId } = action.payload
      if (data) {
        state.tasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, title: data.title } : t
        )
      }
    })
  },
})

// Action creators are generated for each case reducer function
// export const { setCurrentCategory } = categorieSlice.actions

export default categorieSlice.reducer
