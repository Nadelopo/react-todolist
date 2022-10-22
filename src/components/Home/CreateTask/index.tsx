import R from 'react'
import { ReactComponent as TickSVG } from '@/assets/icons/tick.svg'
import { TaskBlock } from '../TaskBlock'
import S from './CreateTask.module.sass'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/redux/store'
import { ICategory } from '@/redux/slices/CategorieSlice/types'
import Swal from 'sweetalert2'
import { addTask } from '@/redux/slices/TaskSlice'

interface IcurrentCategory {
  id?: number
  title?: string
}

export const CreateTask = () => {
  const dispatch = useAppDispatch()
  const [newTask, setNewTask] = R.useState('')
  const [open, setOpen] = R.useState(false)
  const [activeSelect, setActiveSelect] = R.useState(false)
  const [formWarning, setFormWarning] = R.useState(false)
  const [currentCategory, setCurrentCategory] = R.useState<IcurrentCategory>({})
  const { categories } = useSelector((state: RootState) => state.categories)
  const wrapRef = R.useRef(null)

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
                ref={wrapRef}
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
