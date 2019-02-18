import React, { Component } from 'react'
import styled from 'styled-components'
import { palette, spaces, fontSizes } from '../styles/styles'

const StyledPage = styled.div`
  
`

const StyledTitle = styled.h1`
  color: ${palette.text};
  padding: ${spaces.narrow}px;
  font-size: ${fontSizes.title}px;
`

class SecondPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Second Page'
    }
  }

  render () {
    return (
      <StyledPage>
        <StyledTitle>{this.state.title}</StyledTitle>
      </StyledPage>
    )
  }
}

export default SecondPage
