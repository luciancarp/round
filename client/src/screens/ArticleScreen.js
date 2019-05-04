import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'

import { getArticle } from '../actions/articlesActions'

class ArticleScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount () {
    this.props.getArticle(this.props.match.params.id)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.articles.article !== this.props.articles.article &&
        this.props.articles.article._id === this.props.match.params.id) {
      const { article } = this.props.articles
      this.setState({
        name: article.name,
        text: article.text,
        date: article.date
      })
    }
  }

  render () {
    return (
      <StyledPage>
        <h1>{this.state.name}</h1>
        <h2>{this.state.date}</h2>
        <p>{this.state.text}</p>
      </StyledPage>
    )
  }
}

ArticleScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles
})

export default connect(mapStateToProps, { getArticle })(ArticleScreen)
