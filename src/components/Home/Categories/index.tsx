import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routesName } from '@/index'
import { setCurrentCategory } from '@/redux/slices/CategorieSlice'
import { getTasks } from '@/redux/slices/TaskSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import S from './Categories.module.sass'

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch()
  const { categories, currentCategoryId } = useSelector(
    (state: RootState) => state.categories
  )
  const { userId } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getTasks({ userId, currentCategoryId }))
  }, [currentCategoryId])

  return (
    <div>
      <div className="flex justify-center">
        <div className={'my-3 ' + S.scrollcategory}>
          <div className="flex items-center">
            <Link
              to="/"
              className="cbtn"
              onClick={() => dispatch(setCurrentCategory(null))}
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
                onClick={() => dispatch(setCurrentCategory(category.id))}
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
