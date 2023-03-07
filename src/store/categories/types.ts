export interface Category {
  id: number
  created_at: Date
  title: string
  userId: string
}

export interface CategoriesStore {
  categories: Category[]
  currentCategoryId: number | null
  setCategories: (userId: string) => Promise<void>
  createCategory: (title: string, userId: string) => Promise<void>
  updateCategory: (title: string, id: number) => Promise<void>
  deleteCategory: (categoryId: number) => Promise<void>
}
