import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import AppWrapper from './App'
import { store } from './redux/store'
import Auth from '@/pages/Auth'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

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

export const Index = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppWrapper />
        <div className="container">
          <App />
        </div>
      </Provider>
    </Router>
  )
}
