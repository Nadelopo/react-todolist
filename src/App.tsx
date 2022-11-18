import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from './components/Navbar'
import { setUserData, setUserId } from './redux/slices/UserSlice'
import { supabase } from './supabase'
import { RootState, useAppDispatch } from './redux/store'
import { getAllTasks, getTasks } from './redux/slices/TaskSlice'
import { getCategories } from './redux/slices/CategorieSlice'

const AppWrapper: React.FC = () => {
  const dispatch = useAppDispatch()

  const { currentCategoryId } = useSelector(
    (state: RootState) => state.categories
  )

  const [isMounted, setIsMounted] = useState(false)
  const [eventValue, setEventValue] = useState('')
  useEffect(() => {
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

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setEventValue(event)
      if (event !== eventValue) {
        if (session?.user) {
          dispatch(setUserData(session.user.id))
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

  const theme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)

  return (
    <div className="container">
      <Navbar />
    </div>
  )
}

export default AppWrapper
