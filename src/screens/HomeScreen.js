import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import NavBar from '../components/NavBar'
import { palette } from '../styles/styles'

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

class HomeScreen extends Component {
  render () {
    return (
      <div className='App'>
        <NavBar />
        <GlobalStyle />
      </div>
    )
  }
}

export default HomeScreen
