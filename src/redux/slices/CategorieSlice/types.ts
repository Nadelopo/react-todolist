export interface ICategoriesState {
  categories: ICategory[]
  currentCategoryId: number | null
}

export interface ICategory {
  id: number
  created_at: Date
  title: string
  userId: string
}

export interface ICurrentCategory {
  id?: number
  title?: string
}
