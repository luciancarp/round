import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'

export const routes = (
  <Switch>
    <Route path='/' component={HomeScreen} />
  </Switch>
)
