import React, { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { useUserStore } from './store/user'
import { useCategoriesStore } from './store/categories'
import { useTaskStore } from './store/tasks'
import { Navbar } from './components/Navbar'

export const AppWrapper: React.FC = () => {
  const { setUserData, setUserId } = useUserStore((state) => ({
    setUserData: state.setUserData,
    setUserId: state.setUserId
  }))

  const { setTasks, setAllTasks } = useTaskStore((s) => ({
    setTasks: s.setTasks,
    setAllTasks: s.setAllTasks
  }))

  const setCategories = useCategoriesStore.getState().setCategories

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (isMounted) {
      const token = JSON.parse(
        localStorage.getItem('supabase.auth.token') || '{}'
      )?.currentSession?.access_token
      if (token) {
        supabase.auth.api.getUser(token).then((User) => {
          const id = User.user?.id || ''
          setUserData(id)
          setCategories(id)
          setTasks(id)
          setAllTasks()
        })
        setUserId()
      }
    }
    setIsMounted(true)
  }, [isMounted])

  useEffect(() => {
    if (isMounted) {
      let eventValue = ''
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (eventValue !== event) {
          if (session?.user) {
            setUserData(session.user.id)
            setCategories(session.user.id)
            setTasks(session.user.id)
            setUserId()
            setAllTasks()
          } else {
            setUserData('')
            setTasks('')
            setCategories('')
            setUserId()
            setAllTasks()
          }
          eventValue = event
        }
      })
    }
  }, [isMounted])

  const theme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)

  return (
    <div className="container">
      <Navbar />
    </div>
  )
}
