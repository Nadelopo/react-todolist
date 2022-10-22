import R from 'react'
import { ReactComponent as TickSVG } from '@/assets/icons/tick.svg'
import { TaskBlock } from '../TaskBlock'

interface IcurrentCategory {
  id?: number
  title?: string
}

export const CreateTask = () => {
  const [newTask, setNewTask] = R.useState('')
  const [open, setOpen] = R.useState(false)
  const [activeSelect, setActiveSelect] = R.useState(false)
  const [formWarning, setFormWarning] = R.useState(false)
  const [currentCategory, setCurrentCategory] = R.useState<IcurrentCategory>({})

  const wrapRef = R.useRef(null)

  const createTask = () => null

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
                type="text"
                placeholder="название задачи"
                className={
                  'remove__invalid ' + (formWarning && 'form__warning')
                }
                required
              />
            </div>
            <div className="mb-4 relative z-0">
              <div
                ref={wrapRef}
                className={
                  'select' + activeSelect &&
                  ' active ' + formWarning &&
                  'form__warning'
                }
                onClick={(o) => setOpen(!o)}
              >
                <div>{currentCategory.title ?? 'Выберите категорию'}</div>
                <div>
                  <TickSVG />
                </div>
              </div>
              <div className="select-none">.</div>
              <div className={'list ' + (activeSelect && 'active')}>
                {/* <div
                v-for="category in categories"
                :key="category.id"
                className="li"
                tabindex="0"
                @click="setCurrentCategory(category)"
                @keyup.enter="setCurrentCategory(category)"
              >
                {{ category.title }}
              </div> */}
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
