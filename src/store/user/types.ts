export interface User {
  id: string
  email: string
  created_at: Date
}

export interface UserStore {
  user: User | null
  userId: string
  setUserId: () => Promise<void>
  setUserData: (userId: string) => Promise<void>
}
