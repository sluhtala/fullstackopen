import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {  Provider } from 'react-redux'
import store from './store'
import { Container } from '@material-ui/core'

ReactDOM.render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>,
  document.getElementById('root')
)