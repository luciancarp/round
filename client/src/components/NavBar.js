import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { palette, spaces, fontSizes } from '../styles/styles'
import styled from 'styled-components'

const StyledNavBar = styled.div`
  display: flex;
  background-color: ${palette.backgroundColor};
  height: 75px;
  padding: ${spaces.medium}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 5px solid ${palette.accentColor};
`

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledLink = styled(Link)`
  padding-right: ${spaces.medium}px;
  color: ${palette.text};
  text-decoration: none;
  font-size: ${fontSizes.subTitle}px;
`

const StyledLogo = styled.img`
  height: 50px;
  width: 50px;
`

const BorderNavBar = styled.div`
  height: 10px;
  background-color: ${palette.primaryColor}
`

class NavBar extends Component {
  render () {
    return (
      <div>
        <StyledNavBar>
          <StyledLogo src={require('../assets/images/logo_small.png')} />
          <StyledLinks>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='/second-page'>Second</StyledLink>
          </StyledLinks>
        </StyledNavBar>
        <BorderNavBar />
      </div>
    )
  }
}

export default NavBar
