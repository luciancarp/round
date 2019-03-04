import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../../components/layout/StyledPage'
import ArticlesItem from '../../components/issue/ArticlesItem'

import { getArticlesByIssue } from '../../actions/articlesActions'

class IssueScreen extends Component {
  componentDidMount () {
    this.props.getArticlesByIssue(this.props.match.params.id)
  }
  render () {
    const { articlesByIssue } = this.props.articles
    return (
      <StyledPage>
        <h1>Issue</h1>
        {
          articlesByIssue.map(article => <ArticlesItem
            key={article._id}
            id={article._id}
            name={article.name}
            text={article.text}
            date={article.date}
          />)
        }
      </StyledPage>
    )
  }
}

IssueScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  articlesByIssue: PropTypes.object.isRequired,
  getArticlesByIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles
})

export default connect(
  mapStateToProps,
  { getArticlesByIssue }
)(IssueScreen)
