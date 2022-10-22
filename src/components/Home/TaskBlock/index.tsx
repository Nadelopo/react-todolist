import { getTasks } from '@/redux/slices/TaskSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import R from 'react'
import { useSelector } from 'react-redux'

export const TaskBlock = () => {
  const dispatch = useAppDispatch()
  R.useEffect(() => {
    // dispatch(getTasks())
  }, [])
  const { tasks } = useSelector((state: RootState) => state.tasks)
  return (
    <div>
      <div className="wrapper">
        {tasks.map((task) => (
          <div className="task__wrapper" key={task.id}>
            <div
              className={
                'overflow-hidden flex justify-between w-full ' + task.status &&
                'text__crossed'
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
                  className={task.status ? 'check__on' : 'check__off'}
                  // @click="editTaskStatus(task)"
                ></div>
                {/* <Popup
                // :id="task.id"
                // :delete-handler="deleteTask"
                // :change="changeTask"
                // :title="task.title"
              /> */}
              </div>
            </div>
          </div>
        ))}
        {/* <div v-if="isInputOpen" className="mt-6">
        <input v-model="currentChangedTask.title" type="text" />
        <button className="mbtn mt-4" onClick={() => saveChanges}>сохранить</button>
      </div> */}
      </div>
    </div>
  )
}
