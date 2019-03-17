import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logOutUser } from './actions/authActions'

import { createGlobalStyle } from 'styled-components'
import { palette } from './styles/styles'

import SecondPage from './screens/SecondPage'
import Navbar from './components/NavBar'
import HomeScreen from './screens/HomeScreen'
import ThirdPage from './screens/ThirdPage'
import IssueScreen from './screens/issue/IssueScreen'
import IssueNew from './screens/profile/IssueNew'
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
    store.dispatch(logOutUser)
    // Redirect to login
    window.location.href = '/login'
  }
}

const GlobalStyle = createGlobalStyle`
  @import url(//fonts.googleapis.com/css?family=Open+Sans:400|Raleway:300);
  
  * {
    box-sizing: border-box;
  }
  
  body, html, #root {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans';
    height: 100%;
    width: 100%;
    background-color: ${palette.backgroundColor};
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
            <Route exact path='/second-page' component={SecondPage} />
            <Route exact path='/third-page' component={ThirdPage} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Switch>
              <PrivateRoute exact path='/profile' component={ProfileScreen} />
            </Switch>
            <Route exact path='/issue/:id' component={IssueScreen} />
            <Route exact path='/new-issue' component={IssueNew} />

            <Footer />
            <GlobalStyle />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
