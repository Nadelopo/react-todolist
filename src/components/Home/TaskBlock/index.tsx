import React, { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/tasks'
import { Popup } from '@/components/UI/Popup'
import S from './TaskBlock.module.sass'

type TcurrentTask = {
  id?: number
  title?: string
}

export const TaskBlock: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const setAllTasks = useTaskStore.getState().setAllTasks
  const updateTask = useTaskStore.getState().updateTask
  const deleteTask = useTaskStore.getState().deleteTask
  const editTaskStatus = useTaskStore.getState().editTaskStatus

  const [isInputOpen, setIsInputOpen] = useState(false)

  useEffect(() => {
    setAllTasks()
  }, [tasks])

  const [currentChangedTask, setCurrentChangedTask] = useState<TcurrentTask>({})

  const changeTask = (id: number, title: string) => {
    setIsInputOpen(true)
    setCurrentChangedTask({
      id,
      title
    })
  }

  const saveChanges = async () => {
    updateTask(currentChangedTask)
    setIsInputOpen(false)
  }

  const deleteTaskProp = (id: number) => {
    deleteTask(id)
  }

  return (
    <div>
      <div className="wrapper">
        {tasks.map((task) => (
          <div className={S.task__wrapper} key={task.id}>
            <div
              className={
                'overflow-hidden flex justify-between w-full ' +
                (task.status && S.text__crossed)
              }
            >
              <div className="mr-4 overflow-hidden text-ellipsis">
                {task.title}
              </div>

              <div className="mr-2">
                {new Date(task.created_at).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="flex items-center w-14 justify-between">
                <div
                  className={task.status ? S.check__on : S.check__off}
                  onClick={() => editTaskStatus(task)}
                ></div>
                <Popup
                  id={task.id}
                  deleteHandler={deleteTaskProp}
                  change={changeTask}
                  title={task.title}
                />
              </div>
            </div>
          </div>
        ))}
        {isInputOpen && (
          <div className="mt-6">
            <input
              onChange={(e) =>
                setCurrentChangedTask((t) => ({ ...t, title: e.target.value }))
              }
              value={currentChangedTask.title}
              type="text"
            />
            <button className="mbtn mt-4" onClick={saveChanges}>
              сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
