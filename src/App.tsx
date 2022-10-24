import R from 'react'

import { Navbar } from './components/Navbar'
import { setUserData, setUserId } from './redux/slices/UserSlice'
import { supabase } from './supabase'
import { RootState, useAppDispatch } from './redux/store'
import { getAllTasks, getTasks } from './redux/slices/TaskSlice'
import { getCategories } from './redux/slices/CategorieSlice'
import { useSelector } from 'react-redux'

const AppWrapper = () => {
  const dispatch = useAppDispatch()

  const { currentCategoryId } = useSelector(
    (state: RootState) => state.categories
  )

  const [isMounted, setIsMounted] = R.useState(false)
  const [eventValue, setEventValue] = R.useState('')
  R.useEffect(() => {
    if (isMounted) {
      const token = JSON.parse(
        localStorage.getItem('supabase.auth.token') || '{}'
      )?.currentSession?.access_token
      if (token) {
        supabase.auth.api.getUser(token).then((User) => {
          const id = User.user?.id || ''
          dispatch(setUserData(id))
          dispatch(getCategories(id))
          dispatch(getTasks({ userId: id, currentCategoryId }))
          dispatch(getAllTasks(id))
        })
        dispatch(setUserId())
      }
    }
    setIsMounted(true)
  }, [isMounted])

  R.useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setEventValue(event)
      if (event !== eventValue) {
        if (session && session.user) {
          dispatch(setUserData(session.user?.id || ''))
          dispatch(setUserId())
          dispatch(getCategories(session.user.id))
          dispatch(getTasks({ userId: session.user.id, currentCategoryId }))
          dispatch(getAllTasks(session.user.id))
        } else {
          dispatch(setUserData(''))
          dispatch(getTasks({ userId: '', currentCategoryId }))
          dispatch(getAllTasks(''))
          dispatch(setUserId())
          dispatch(getCategories(''))
        }
      }
    })
  }, [eventValue])

  return (
    <div className="container">
      <Navbar />
    </div>
  )
}

export default AppWrapper
