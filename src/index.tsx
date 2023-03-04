import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  useNavigate,
  useRoutes
} from 'react-router-dom'
import { AppWrapper } from './App'
import Auth from '@/pages/Auth'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { supabase } from './supabase'

export const routesName = {
  Auth: '/auth',
  Home: '/',
  Profile: '/profile'
}
const locate = window.location.pathname
const App = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)

  const token = JSON.parse(localStorage.getItem('supabase.auth.token') || '{}')
    ?.currentSession?.access_token
  if (token) {
    supabase.auth.api.getUser(token).then(({ data, error }) => {
      if (data) setIsLogin(true)
      if (error) console.log(error)
    })
  }

  useEffect(() => {
    if (isLogin) navigate(locate)
    else navigate('/auth')
  }, [isLogin])

  return useRoutes([
    { path: routesName.Auth, element: <Auth /> },
    { path: routesName.Home, element: <Home /> },
    { path: routesName.Profile, element: <Profile /> }
  ])
}

export const Index = () => {
  return (
    <Router>
      <AppWrapper />
      <div className="container">
        <App />
      </div>
    </Router>
  )
}
