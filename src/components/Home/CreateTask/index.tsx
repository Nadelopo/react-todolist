import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { TaskBlock } from '../TaskBlock'
import { RootState, useAppDispatch } from '@/redux/store'
import { ICategory } from '@/redux/slices/CategorieSlice/types'
import { addTask } from '@/redux/slices/TaskSlice'
import S from './CreateTask.module.sass'
import { ReactComponent as TickSVG } from '@/assets/icons/tick.svg'
import { isOutside } from '@/utils/isOutside'

interface IcurrentCategory {
  id?: number
  title?: string
}

export const CreateTask: React.FC = () => {
  const dispatch = useAppDispatch()
  const [newTask, setNewTask] = useState('')
  const [open, setOpen] = useState(false)
  const [activeSelect, setActiveSelect] = useState(false)
  const [formWarning, setFormWarning] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<IcurrentCategory>({})
  const { categories } = useSelector((state: RootState) => state.categories)
  const selectRef = useRef(null)

  const clickOnCategory = (category: ICategory) => {
    setCurrentCategory({ id: category.id, title: category.title })
    setActiveSelect(false)
  }

  const { userId } = useSelector((state: RootState) => state.user)

  const createTask = () => {
    if (!currentCategory.id || !newTask) {
      setFormWarning(true)
      Swal.fire('Заполните поля', '', 'warning')
    } else if (currentCategory.id !== null) {
      dispatch(
        addTask({
          title: newTask,
          categoryId: currentCategory.id,
          userId,
        })
      )
      setNewTask('')
    }
  }

  const hideSelect = (e: MouseEvent) => {
    if (isOutside(selectRef, e)) setActiveSelect(false)
  }

  useEffect(() => {
    if (activeSelect) addEventListener('click', hideSelect)
    else removeEventListener('click', hideSelect)
    return () => removeEventListener('click', hideSelect)
  }, [activeSelect])

  return (
    <div>
      <div className="mb-4 mx-auto">
        <button className="cbtn" onClick={() => setOpen(!open)}>
          <div>{open ? 'закрыть' : 'создать'}</div>
        </button>
      </div>
      <div>
        {/* <transition-group name="flip"> */}
        {open && (
          <div className="wrapper">
            <div className="mb-4">
              <input
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
                type="text"
                placeholder="название задачи"
                className={`${S.remove__invalid} ${
                  formWarning && S.form__warning
                }`}
                required
              />
            </div>
            <div className="mb-4 relative z-0">
              <div
                ref={selectRef}
                className={`${S.select} ${activeSelect && S.select__active} ${
                  formWarning && S.form__warning
                }`}
                onClick={() => setActiveSelect(!activeSelect)}
              >
                <div>{currentCategory.title ?? 'Выберите категорию'}</div>
                <div>
                  <TickSVG className={S.select__tick} />
                </div>
              </div>
              <div className="select-none">.</div>
              <div className={`${S.list}  ${activeSelect && S.list__active}`}>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={S.li}
                    tabIndex={0}
                    onClick={() => clickOnCategory(category)}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button className="mbtn mt-3" onClick={createTask}>
                добавить
              </button>
            </div>
          </div>
        )}
        <TaskBlock />
        {/* </transition-group> */}
      </div>
    </div>
  )
}
