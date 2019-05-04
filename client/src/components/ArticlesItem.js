import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { palette, spaces } from '../styles/styles'

const StyledTitleArticleWrapper = styled.div`
  padding: ${spaces.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.selected ? `${palette.primaryColor}` : `${palette.text}`};
`

class ArticlesItem extends Component {
  render () {
    return (
      <StyledTitleArticleWrapper selected={this.props.selected}>
        <li>
          <Link to={`/article/${this.props.id}`}>
            {this.props.name} • {this.props.author.name}
          </Link>
        </li>
      </StyledTitleArticleWrapper>
    )
  }
}

export default ArticlesItem
