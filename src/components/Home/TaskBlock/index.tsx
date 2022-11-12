import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'
import {
  deleteTask,
  editTaskStatus,
  getAllTasks,
  updateTask,
} from '@/redux/slices/TaskSlice'
import { Popup } from '@/components/UI/Popup'
import S from './TaskBlock.module.sass'

type TcurrentTask = {
  id?: number
  title?: string
}

export const TaskBlock: React.FC = () => {
  const dispatch = useAppDispatch()
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const { userId } = useSelector((state: RootState) => state.user)

  const [isInputOpen, setIsInputOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllTasks(userId))
  }, [tasks])

  const [currentChangedTask, setCurrentChangedTask] = useState<TcurrentTask>({})

  const changeTask = (id: number, title: string) => {
    setIsInputOpen(true)
    setCurrentChangedTask({
      id,
      title,
    })
  }

  const setCurrentTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentChangedTask({ ...currentChangedTask, title: e.target.value })
  }

  const saveChanges = async () => {
    dispatch(updateTask(currentChangedTask))
    setIsInputOpen(false)
  }

  const deleteTaskProp = (id: number) => {
    dispatch(deleteTask(id))
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
                  onClick={() => dispatch(editTaskStatus(task))}
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
              onChange={setCurrentTaskTitle}
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
