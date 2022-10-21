import { routesName } from '@/App'
import { getCategories } from '@/redux/slices/CategorieSlice'
import { RootState, useAppDispatch } from '@/redux/store'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import S from './Categories.module.sass'

export const Categories = () => {
  const dispatch = useAppDispatch()
  const { categories } = useSelector((state: RootState) => state.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div>
      <div className="flex justify-center">
        <div className={'my-3 ' + S.scrollcategory}>
          <div className="flex items-center">
            <div className="cbtn">все</div>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="mx-2 flex items-center">
              <Link
                to={`${routesName.Home}?category=${category.id}`}
                className="cbtn"
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
