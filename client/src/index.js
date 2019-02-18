import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import * as serviceWorker from './serviceWorker'

import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

const renderApp = (appRoutes) => ReactDOM.render(
  <BrowserRouter>{appRoutes}</BrowserRouter>,
  rootElement
)

renderApp(routes)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
