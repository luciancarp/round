import React, { Component } from 'react'
import { palette, spaces, device } from '../styles/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import StyledLink from './common/StyledLink'

const StyledNavBar = styled.div`
  margin: 0px;
  display: flex;
  background-color: ${palette.BackgroundColor};
  height: 50px;
  padding: ${spaces.narrow}px;
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

const StyledGreeting = styled.div`
  padding: ${spaces.narrow}px;
`

// const StyledLogo = styled.img`
//   height: 50px;
//   width: 50px;
// `

class NavBar extends Component {
  render() {
    const hasProfile =
      this.props.auth.isAuthenticated &&
      (this.props.auth.user.role === '0' || this.props.auth.user.role === '1')

    let name = ''
    if (this.props.auth.isAuthenticated)
      name = this.props.auth.user.name.split(' ')

    return (
      <div>
        <StyledNavBar>
          <StyledNavBarContent>
            {/* <Link to='/'>
              <StyledLogo src={require('../assets/images/logo_small.png')} />
            </Link> */}
            {this.props.auth.isAuthenticated && (
              <StyledGreeting>{`Hi, ${name[0]}`}</StyledGreeting>
            )}
            <StyledLinks>
              {hasProfile && (
                <StyledLink to='/profile'>Your Profile</StyledLink>
              )}
            </StyledLinks>
          </StyledNavBarContent>
        </StyledNavBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(NavBar)
