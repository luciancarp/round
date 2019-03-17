import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { palette, spaces, fontSizes, device } from '../styles/styles'
import styled from 'styled-components'

const StyledNavBar = styled.div`
  margin: 0px;
  display: flex;
  background-color: ${palette.darkBackgroundColor};
  height: 75px;
  padding: ${spaces.medium}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const StyledNavBarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media ${device.mobileS} {  
    min-width: 100%;
  }

    @media ${device.laptop} {  
    min-width: 1000px;
  }

  @media ${device.desktop} {
    min-width: 1400px;
  }
`

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledLink = styled(Link)`
  margin-left: ${spaces.medium}px;
  color: ${palette.darkText};
  text-decoration: none;
  font-size: ${fontSizes.subTitle}px;
`

const StyledLogo = styled.img`
  height: 50px;
  width: 50px;
`

class NavBar extends Component {
  render () {
    return (
      <div>
        <StyledNavBar>
          <StyledNavBarContent>
            <Link to='/'>
              <StyledLogo src={require('../assets/images/logo_small.png')} />
            </Link>
            <StyledLinks>
              <StyledLink to='/'>Home</StyledLink>
              <StyledLink to='/login'>Login</StyledLink>
              <StyledLink to='/register'>Register</StyledLink>
              <StyledLink to='/profile'>Profile</StyledLink>
              <StyledLink to='/second-page'>Second</StyledLink>
              <StyledLink to='/third-page'>Third</StyledLink>
            </StyledLinks>
          </StyledNavBarContent>
        </StyledNavBar>
      </div>
    )
  }
}

export default NavBar
