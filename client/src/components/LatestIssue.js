import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { spaces, palette, device } from '../styles/styles'

import SvgRoundBg from './SvgRoundBg'
import FadeTransition from './FadeTransition'
import FadeWrapper from './FadeWrapper'

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  // padding-top: ${spaces.narrow}px;
  padding-bottom: ${spaces.wide}px;
  flex-grow: 1;
`

const StyledContentWrapper = styled.div`
  position: relative;
  width: 90%;
`

const StyledContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(248, 203, 51, 1);
  }

  100% {
    box-shadow: 0 0 0 15px rgba(248, 203, 51, 0);
  }
`

const StyledCoverButton = styled.button`
  position: relative;

  cursor: pointer;
  text-decoration: none;
  border: none;
  background: none;

  font-family: inherit;
  font-size: inherit;
  padding: 15px;
  border-radius: 50%;

  -webkit-transition: color 0.2s, text-shadow 0.2s; /* Safari */
  transition: color 0.2s, text-shadow 0.2s;
  transition-timing-function: ease-out;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:focus,
  &:target {
    color: ${palette.primaryColor};
  }

  &:active {
    text-shadow: 0 0 3px ${palette.primaryColor};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${palette.primaryColor};
  }
`

const StyledCover = styled.img`
  width: 125px;
  height: 125px;
  object-fit: cover;
  border-style: solid;
  border-width: 4px 4px 4px 4px;
  border-radius: 5px 5px 5px 5px;
  border-color: ${palette.primaryColor};
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;

  @media ${device.mobileS} {
    width: 160px;
    height: 160px;
  }

  @media ${device.mobileM} {
    width: 200px;
    height: 200px;
  }

  @media ${device.mobileL} {
    width: 230px;
    height: 230px;
  }

  @media ${device.tablet} {
    width: 430px;
    height: 430px;
  }

  @media ${device.laptop} {
    width: 550px;
    height: 550px;
  }

  @media ${device.laptopL} {
    width: 550px;
    height: 550px;
  }

  @media ${device.desktop} {
    width: 550px;
    height: 550px;
  }
`

const StyledButtonTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(20, 19, 21, 0.5);
  border-radius: 50%;
`

const StyledButtonTitle = styled.h1`
  color: ${palette.text}
  text-shadow: 0 0 5px rgb(20, 19, 21, 0.5);
`

class LatestIssue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  hoverOn = () => {
    this.setState({ hover: true })
  }

  hoverOff = () => {
    this.setState({ hover: false })
  }

  render() {
    return (
      <StyledWrapper>
        <StyledContentWrapper>
          <SvgRoundBg />

          <StyledContent>
            <StyledCoverButton
              onClick={this.props.onClick}
              onMouseEnter={this.hoverOn}
              onMouseLeave={this.hoverOff}
            >
              <StyledCover src={this.props.cover} />
              <FadeTransition in={this.state.hover}>
                <FadeWrapper noTransform>
                  <StyledButtonTitleWrapper>
                    <StyledButtonTitle>
                      Latest Issue: <br />
                      {this.props.title}
                    </StyledButtonTitle>
                  </StyledButtonTitleWrapper>
                </FadeWrapper>
              </FadeTransition>
            </StyledCoverButton>
          </StyledContent>
        </StyledContentWrapper>
      </StyledWrapper>
    )
  }
}

LatestIssue.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default LatestIssue
