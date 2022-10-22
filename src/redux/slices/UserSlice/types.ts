export interface Iuser {
  id: string
  email: string
  created_at: Date
}

export interface IUserState {
  user: Iuser | null
  userId: string
}
