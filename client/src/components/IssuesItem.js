import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class IssuesItem extends Component {
  render () {
    return (
      <div>
        <Link to={`/issue/${this.props.id}`}>{this.props.name}</Link>
        <p>{this.props.description}</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}

export default IssuesItem
