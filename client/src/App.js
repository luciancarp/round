import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomeScreen from './screens/HomeScreen'
import { createGlobalStyle } from 'styled-components'
import { palette } from './styles/styles'

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
    background-color: ${palette.backgroundColor}
  }
`

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path='/' component={HomeScreen} />
          </Switch>
          <GlobalStyle />
        </div>
      </Router>
    )
  }
}

export default App
