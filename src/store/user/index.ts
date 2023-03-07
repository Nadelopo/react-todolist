import create from 'zustand'
import { supabase } from '@/supabase'
import { getOneById } from '@/utils/queries'
import { User, UserStore } from './types'

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  userId: '',
  setUserId: async () => {
    const token = JSON.parse(
      localStorage.getItem('supabase.auth.token') || '{}'
    )?.currentSession?.access_token
    const id = (await supabase.auth.api.getUser(token)).user?.id
    if (id) {
      set({ userId: id })
    }
  },
  setUserData: async (userId: string) => {
    const data = await getOneById<User>('Users', userId)
    set({ user: data })
  }
}))
