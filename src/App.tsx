import React from 'react'

import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import Auth from '@/pages/Auth'
import { Home } from './pages/Home'

export const routesName = {
  Auth: '/auth',
  Home: '/sd',
}

const App = () => {
  const routes = useRoutes([
    { path: routesName.Auth, element: <Auth /> },
    { path: routesName.Home, element: <Home /> },
  ])
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <div className="container">
        <App />
      </div>
    </Router>
  )
}

export default AppWrapper
