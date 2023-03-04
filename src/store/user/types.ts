export interface Iuser {
  id: string
  email: string
  created_at: Date
}

export interface userStore {
  user: Iuser | null
  userId: string
  setUserId: () => Promise<void>
  setUserData: (userId: string) => Promise<void>
}
