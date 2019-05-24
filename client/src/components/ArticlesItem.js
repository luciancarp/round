import React, { Component } from 'react'
import styled from 'styled-components'

import DateText from './common/DateText'
import StyledLink from './common/StyledLink'

import { palette, spaces } from '../styles/styles'

const StyledTitleArticleWrapper = styled.div`
  padding: ${spaces.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props =>
    props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  white-space: nowrap;
`

class ArticlesItem extends Component {
  render() {
    let info = ''
    if (this.props.profile) {
      info = (
        <span>
          <span>{this.props.issue}</span>
          <span> • </span>
          <DateText date={this.props.date} />
        </span>
      )
    } else {
      info = this.props.author.name
    }
    return (
      <StyledTitleArticleWrapper>
        <li>
          <StyledLink
            to={`/article/${this.props.id}`}
            selected={this.props.selected}
          >
            {this.props.name} • {info}
          </StyledLink>
        </li>
      </StyledTitleArticleWrapper>
    )
  }
}

export default ArticlesItem
