import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logOutUser } from './actions/authActions'

import styled, { createGlobalStyle } from 'styled-components'
import { palette, spaces } from './styles/styles'

import Navbar from './components/NavBar'
import HomeScreen from './screens/HomeScreen'
import IssueScreen from './screens/IssueScreen'
import IssueNew from './screens/IssueNewScreen'
import ArticleNew from './screens/ArticleNewScreen'
// import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ArticleScreen from './screens/ArticleScreen'

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
    // window.location.href = '/login'
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

  input[type=text], select, textarea, button{
  font-family: 'Acre-Medium';
  padding: ${spaces.narrow};
  font-size: 1em;

  button {
    cursor: pointer;
  }
}
`

const Wrapper = styled.div`
  // omitted

  div.transition-group {
    position: relative;
  }
  section.route-section {
    position: absolute;
    width: 100%;
    top: 75;
    left: 0;
  }
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Wrapper>
            <Navbar />
            <Route
              render={({ location }) => {
                return (
                  <TransitionGroup
                    component={null}
                    className='transition-group'
                  >
                    <CSSTransition
                      key={location.key}
                      timeout={{
                        enter: 500,
                        exit: 100
                      }}
                      classNames='fade'
                    >
                      {/* <section className='route-section'> */}
                      <Switch location={location}>
                        <Route exact path='/' component={HomeScreen} />
                        <Route exact path='/login' component={LoginScreen} />
                        <Route
                          exact
                          path='/register'
                          component={RegisterScreen}
                        />
                        <Route
                          exact
                          path='/issue/:id'
                          component={IssueScreen}
                        />
                        <Route
                          exact
                          path='/article/:id'
                          component={ArticleScreen}
                        />
                        <Switch>
                          <PrivateRoute
                            exact
                            path='/profile'
                            component={ProfileScreen}
                          />
                          <PrivateRoute
                            exact
                            path='/new-issue'
                            component={IssueNew}
                          />
                          <PrivateRoute
                            exact
                            path='/new-article'
                            component={ArticleNew}
                          />
                        </Switch>
                      </Switch>
                      {/* <Footer /> */}
                      {/* </section> */}
                    </CSSTransition>
                  </TransitionGroup>
                )
              }}
            />

            <GlobalStyle />
          </Wrapper>
        </Router>
      </Provider>
    )
  }
}

export default App
