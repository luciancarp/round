import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { spaces } from '../styles/styles'
import SvgRoundBg from './SvgRoundBg'

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spaces.wide}px;
  padding-top: ${spaces.narrow}px;
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

class LatestIssue extends Component {
  render() {
    return (
      <StyledWrapper>
        <StyledContentWrapper>
          <SvgRoundBg />

          <StyledContent>
            <button onClick={this.props.onClick}>hello</button>
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
