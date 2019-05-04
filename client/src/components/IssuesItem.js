import React, { Component } from 'react'
import styled from 'styled-components'

import StyledLink from './common/StyledLink'
import DateText from './common/DateText'

import { spaces } from '../styles/styles'

const StyleTitleIssueWrapper = styled.div`
  padding: ${spaces.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`

class IssuesItem extends Component {
  render () {
    return (
      <StyleTitleIssueWrapper>
        <li>
          <StyledLink
            to={`/issue/${this.props.id}`}
          >
            {this.props.name} • {<DateText date={this.props.date} issue />}
          </StyledLink>
        </li>
      </StyleTitleIssueWrapper>
    )
  }
}

export default IssuesItem
