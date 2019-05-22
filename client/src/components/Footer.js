import React, { Component } from 'react'
import { palette, spaces, fontSizes, device } from '../styles/styles'
import styled from 'styled-components'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import StyledLink from './common/StyledLink'
import StyledButton from './common/StyledButton'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logOutUser } from '../actions/authActions'

const StyledNavBar = styled.div`
  display: flex;
  margin: 0px;
  background-color: ${palette.BackgroundColor};
  height: 150px;
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

const StyledCopy = styled.span`
  font-size: ${fontSizes.regular}px;
  color: ${palette.darkTextSecundary};
`

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledSocial = styled.div`
  margin-left: ${spaces.wide}px;
`

// const StyledLogo = styled.img`
//   height: 50px;
//   width: 50px;
// `

const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`

class Footer extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logOutUser()
  }

  render() {
    let currentYear = new Date().getFullYear()
    const isAuthenticated = this.props.auth.isAuthenticated
    return (
      <Wrapper>
        <StyledNavBar>
          <StyledNavBarContent>
            {/* <Link to='/'>
              <StyledLogo src={require('../assets/images/logo_small.png')} />
            </Link> */}
            <StyledMap>
              <StyledLink to='/'>Home</StyledLink>
              {isAuthenticated && (
                <StyledButton onClick={e => this.onLogoutClick(e)}>
                  Log Out
                </StyledButton>
              )}
              {!isAuthenticated && <StyledLink to='/login'>Login</StyledLink>}
              {!isAuthenticated && (
                <StyledLink to='/register'>Register</StyledLink>
              )}
            </StyledMap>

            <StyledCopy>
              © Copyright {currentYear}.<br />
              All right reserved.
            </StyledCopy>
            <StyledLinks>
              <StyledSocial>
                <FaFacebookF size='30px' color={palette.darkTextSecundary} />
              </StyledSocial>
              <StyledSocial>
                <FaTwitter size='30px' color={palette.darkTextSecundary} />
              </StyledSocial>
              <StyledSocial>
                <FaInstagram size='30px' color={palette.darkTextSecundary} />
              </StyledSocial>
            </StyledLinks>
          </StyledNavBarContent>
        </StyledNavBar>
      </Wrapper>
    )
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logOutUser }
)(Footer)
