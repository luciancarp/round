import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class ArticlesItem extends Component {
  render () {
    return (
      <div>
        {/* <Link to={`/issues/${this.props.id}`}>{this.props.name}</Link> */}
        <h1>{this.props.name}</h1>
        <p>{this.props.text}</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}

export default ArticlesItem
