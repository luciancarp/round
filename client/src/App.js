import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logOutUser } from './actions/authActions'

import { createGlobalStyle } from 'styled-components'
import { palette } from './styles/styles'

import Navbar from './components/NavBar'
import HomeScreen from './screens/home/HomeScreen'
import IssueScreen from './screens/issue/IssueScreen'
import IssueNew from './screens/profile/IssueNew'
import ArticleNew from './screens/profile/ArticleNew'
import Footer from './components/Footer'
import LoginScreen from './screens/auth/LoginScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ProfileScreen from './screens/profile/ProfileScreen'

import PrivateRoute from './components/common/PrivateRoute'

import { Provider } from 'react-redux'
import store from './store'

if (window.localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(window.localStorage.jwtToken)
  // Decode token adn get user info and exp
  const decoded = jwtDecode(window.localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logOutUser())
    // Redirect to login
    window.location.href = '/login'
  }
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Acre-Medium';
    src: url('/fonts/Acre-Medium.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/Acre-Medium.woff') format('woff'), /* Pretty Modern Browsers */
        url('/fonts/Acre-Medium.ttf')  format('truetype'); /* Safari, Android, iOS */
    font-weight: normal;
    font-style: normal;
}
  
  * {
    box-sizing: border-box;
  }
  
  body, html, #root {
    margin: 0;
    padding: 0;
    font-family: 'Acre-Medium';
    height: 100%;
    width: 100%;
    color: ${palette.text};
    background-color: ${palette.BackgroundColor};
  }
`

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />

            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Switch>
              <PrivateRoute exact path='/profile' component={ProfileScreen} />
            </Switch>
            <Route exact path='/issue/:id' component={IssueScreen} />
            <Switch>
              <PrivateRoute exact path='/new-issue' component={IssueNew} />
            </Switch>
            <Switch>
              <PrivateRoute exact path='/new-article' component={ArticleNew} />
            </Switch>

            <Footer />
            <GlobalStyle />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
