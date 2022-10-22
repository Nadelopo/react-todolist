import { supabase } from '@/supabase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Iuser, IUserState } from './types'

export const setUserData = createAsyncThunk(
  'user/setUserData',
  async (userId: string) => {
    if (!userId) return null
    const { data, error } = await supabase
      .from<Iuser>('Users')
      .select()
      .eq('id', userId)
      .single()
    if (error) console.log(error)
    return data
  }
)

export const setUserId = createAsyncThunk('user,setUserId', async () => {
  const token = JSON.parse(localStorage.getItem('supabase.auth.token') || '{}')
    ?.currentSession?.access_token
  if (!Object.keys(token).length) return ''
  const data = (await supabase.auth.api.getUser(token)).user?.id || ''
  return data
})

const initialState: IUserState = {
  user: null,
  userId: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserData.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(setUserId.fulfilled, (state, action) => {
      state.userId = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
// export const { setCurrentCategory } = userSlice.actions

export default userSlice.reducer
