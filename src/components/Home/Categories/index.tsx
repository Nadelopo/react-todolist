import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/user'
import { useCategoriesStore } from '@/store/categories'
import { useTaskStore } from '@/store/tasks'
import { routesName } from '@/index'
import S from './Categories.module.sass'

export const Categories: React.FC = () => {
  const userId = useUserStore((state) => state.userId)
  const { categories, currentCategoryId } = useCategoriesStore((s) => ({
    categories: s.categories,
    currentCategoryId: s.currentCategoryId
  }))
  const setTasks = useTaskStore.getState().setTasks

  const setCurrentCategory = (value: number | null) => {
    useCategoriesStore.setState({ currentCategoryId: value })
  }

  useEffect(() => {
    if (userId) {
      setTasks(userId)
    }
  }, [currentCategoryId, userId])

  return (
    <div>
      <div className="flex justify-center">
        <div className={'my-3 ' + S.scrollcategory}>
          <div className="flex items-center">
            <Link
              to="/"
              className={'cbtn ' + (!currentCategoryId && 'active')}
              onClick={() => setCurrentCategory(null)}
            >
              все
            </Link>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="mx-2 flex items-center">
              <Link
                to={`${routesName.Home}?category=${category.id}`}
                className={
                  'cbtn ' + (category.id === currentCategoryId && 'active')
                }
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
