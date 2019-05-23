import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SvgRoundBg from './SvgRoundBg'

const StyledContentWrapper = styled.div`
  display: block;
`

class LatestIssue extends Component {
  render() {
    return (
      <div>
        <SvgRoundBg />
        <button onClick={this.props.onClick}>hello</button>
      </div>
    )
  }
}

LatestIssue.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default LatestIssue
