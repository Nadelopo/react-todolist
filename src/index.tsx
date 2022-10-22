import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import AppWrapper from './App'
import { store } from './redux/store'

export const Index = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </Router>
  )
}
