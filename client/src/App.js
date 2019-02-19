import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { palette } from './styles/styles'
import SecondPage from './screens/SecondPage'
import Navbar from './components/NavBar'
import HomeScreen from './screens/HomeScreen'
import ThirdPage from './screens/ThirdPage'
import Footer from './components/Footer'

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
      <Router>
        <div>
          <Navbar />

          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/second-page' component={SecondPage} />
          <Route exact path='/third-page' component={ThirdPage} />

          <Footer />
          <GlobalStyle />
        </div>
      </Router>
    )
  }
}

export default App
