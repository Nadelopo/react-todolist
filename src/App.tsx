import React from 'react'

import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import Auth from '@/pages/Auth'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Navbar } from './components/Navbar'

export const routesName = {
  Auth: '/auth',
  Home: '/',
  Profile: '/profile',
}

const App = () => {
  const routes = useRoutes([
    { path: routesName.Auth, element: <Auth /> },
    { path: routesName.Home, element: <Home /> },
    { path: routesName.Profile, element: <Profile /> },
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <App />
      </div>
    </Router>
  )
}

export default AppWrapper
