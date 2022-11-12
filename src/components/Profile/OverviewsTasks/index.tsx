import React, { useMemo } from 'react'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import S from './OverviewsTasks.module.sass'

export const OverviewsTasks: React.FC = () => {
  const { allTasks } = useSelector((state: RootState) => state.tasks)
  const completedTasks = useMemo(
    () => allTasks.filter((e) => e.status === true).length,
    [allTasks]
  )
  const notCompleted = useMemo(
    () => allTasks.filter((e) => e.status === false).length,
    [allTasks]
  )

  return (
    <div className="mb-6">
      <div className="font-medium text-lg mb-4">Обзор задач</div>
      <div className="flex gap-2">
        <div className={S.task__wrapper}>
          <div>{completedTasks}</div>
          <div className="text-center">Завершенные задачи</div>
        </div>
        <div className={S.task__wrapper}>
          <div>{notCompleted}</div>
          <div className="text-center">Не завершенные задачи</div>
        </div>
      </div>
    </div>
  )
}
