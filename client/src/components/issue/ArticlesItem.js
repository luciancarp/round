import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { palette, spaces } from '../../styles/styles'

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
        {/* <Link to={`/issues/${this.props.id}`}>{this.props.name}</Link> */}
        <li>{this.props.name} • {this.props.author.name}</li>
      </StyledTitleArticleWrapper>
    )
  }
}

export default ArticlesItem
