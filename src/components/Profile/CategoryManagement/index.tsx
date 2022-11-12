import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { RootState, useAppDispatch } from '@/redux/store'
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '@/redux/slices/CategorieSlice'
import { Popup } from '@/components/UI/Popup'
import S from './CategoryManagement.module.sass'

export const CategoryManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const { categories } = useSelector((state: RootState) => state.categories)
  const { userId } = useSelector((state: RootState) => state.user)

  const [changeStateCategory, setChangeStateCategory] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [changeCategory, setChangeCategoryy] = useState('')
  const [currentCategoryId, setCurrentCategoryId] = useState(0)

  const openAddCategory = () => {
    setChangeStateCategory(false)
    setOpenInput(true)
  }

  const cancel = () => {
    setChangeStateCategory(false)
    setOpenInput(false)
    setNewCategory('')
    setChangeCategoryy('')
  }

  const change = (id: number, title: string) => {
    setChangeStateCategory(true)
    setOpenInput(false)
    setChangeCategoryy(title)
    setCurrentCategoryId(id)
  }

  const deleteCategoryProps = (id: number) => {
    dispatch(deleteCategory(id))
  }

  const save = async () => {
    if (newCategory || changeCategory) {
      if (changeStateCategory) {
        dispatch(updateCategory({ title: changeCategory, currentCategoryId }))
      } else if (openInput) {
        dispatch(createCategory({ title: newCategory, userId }))
      }
      cancel()
    } else {
      Swal.fire('Заполните данные', '', 'warning')
    }
  }

  return (
    <div>
      <div className="font-medium text-lg mb-4">Управление категориями</div>
      <div className="wrapper">
        {categories && (
          <div className="flex flex-col gap-y-4">
            {categories.map((category) => (
              <div key={category.id} className={S.category}>
                <div className={S.shadow__none}>{category.title}</div>
                <Popup
                  id={category.id}
                  deleteHandler={deleteCategoryProps}
                  change={change}
                  title={category.title}
                />
              </div>
            ))}
          </div>
        )}
        {openInput && (
          <div>
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              className="mt-6"
            />
          </div>
        )}
        {!openInput && !changeStateCategory && (
          <div>
            <button className="mbtn mt-6" onClick={openAddCategory}>
              добавить категорию
            </button>
          </div>
        )}
        {changeStateCategory && (
          <div>
            <input
              value={changeCategory}
              onChange={(e) => setChangeCategoryy(e.target.value)}
              type="text"
              className="mt-6"
            />
          </div>
        )}
        {(openInput || changeStateCategory) && (
          <div>
            <button className="mbtn mt-4" onClick={cancel}>
              отменить
            </button>
          </div>
        )}
        <button className="mbtn mt-6" onClick={save}>
          сохранить
        </button>
      </div>
    </div>
  )
}
