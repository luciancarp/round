import React, { Component } from 'react'

import StyledLink from './common/StyledLink'

class IssuesItem extends Component {
  render () {
    return (
      <div>
        <StyledLink
          to={`/issue/${this.props.id}`}
        >
          {this.props.name}
        </StyledLink>
        <p>{this.props.description}</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}

export default IssuesItem
