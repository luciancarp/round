import React, { Component } from 'react'
import styled from 'styled-components'

import StyledLink from './common/StyledLink'
import DateText from './common/DateText'

import { palette, spaces } from '../styles/styles'

const StyledTitleArticleWrapper = styled.div`
  padding: ${spaces.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  white-space: nowrap;
`

class ArticlesItem extends Component {
  render () {
    return (
      <StyledTitleArticleWrapper >
        <li>
          <StyledLink
            to={`/article/${this.props.id}`}
            selected={this.props.selected}
          >
            {this.props.name} • {this.props.author.name} • {<DateText date={this.props.date} />}
          </StyledLink>
        </li>
      </StyledTitleArticleWrapper>
    )
  }
}

export default ArticlesItem
