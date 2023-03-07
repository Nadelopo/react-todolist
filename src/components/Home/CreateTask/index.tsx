import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { useTaskStore } from '@/store/tasks'
import { useUserStore } from '@/store/user'
import { useCategoriesStore } from '@/store/categories'
import { TaskBlock } from '../TaskBlock'
import { isOutside } from '@/utils/isOutside'
import { Category } from '@/store/categories/types'
import S from './CreateTask.module.sass'
import { ReactComponent as TickSVG } from '@/assets/icons/tick.svg'

interface CurrentCategory {
  id?: number
  title?: string
}

export const CreateTask: React.FC = () => {
  const [newTask, setNewTask] = useState('')
  const [open, setOpen] = useState(false)
  const [activeSelect, setActiveSelect] = useState(false)
  const [formWarning, setFormWarning] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<CurrentCategory>({})
  const selectRef = useRef(null)

  const categories = useCategoriesStore((state) => state.categories)
  const addTask = useTaskStore.getState().addTask
  const userId = useUserStore((state) => state.userId)

  const clickOnCategory = (category: Category) => {
    setCurrentCategory({ id: category.id, title: category.title })
    setActiveSelect(false)
  }

  const createTask = () => {
    if (!currentCategory.id || !newTask) {
      setFormWarning(true)
      Swal.fire('Заполните поля', '', 'warning')
    } else if (currentCategory.id !== null) {
      addTask(newTask, currentCategory.id, userId)
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
