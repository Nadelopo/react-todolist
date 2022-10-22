import { routesName } from '@/App'
import { setCurrentCategory } from '@/redux/slices/CategorieSlice'
import { RootState, useAppDispatch } from '@/redux/store'

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import S from './Categories.module.sass'

export const Categories = () => {
  const dispatch = useAppDispatch()
  const { categories, currentCategoryId } = useSelector(
    (state: RootState) => state.categories
  )

  return (
    <div>
      <div className="flex justify-center">
        <div className={'my-3 ' + S.scrollcategory}>
          <div className="flex items-center">
            <div
              className="cbtn"
              onClick={() => dispatch(setCurrentCategory(null))}
            >
              все
            </div>
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
