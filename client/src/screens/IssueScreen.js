import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import isEmpty from '../utils/isEmpty'

import StyledPage from '../components/layout/StyledPage'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import ArticlesItem from '../components/ArticlesItem'
import Spinner from '../components/common/Spinner'

import { getArticlesByIssue } from '../actions/articlesActions'

class IssueScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topicSelected: '',
      articlesByIssue: [],
      loading: true
    }
  }

  componentDidMount () {
    this.props.getArticlesByIssue(this.props.match.params.id)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.articles.articlesByIssue !== this.props.articles.articlesByIssue) {
      const { articlesByIssue } = this.props.articles
      this.setState({
        articlesByIssue: articlesByIssue,
        loading: false
      })
    }
  }

  render () {
    const { articlesByIssue } = this.state

    let issueName = ''
    if (!isEmpty(articlesByIssue)) {
      issueName = articlesByIssue[0].issue.name
    }

    let topicsInIssue = []

    articlesByIssue.forEach(article => {
      if (article.topic !== null && topicsInIssue.indexOf(article.topic) === -1) {
        topicsInIssue.push(article.topic)
      }
    })

    articlesByIssue.forEach(article => {
      article.selected = (article.topic === this.state.topicSelected)
    })

    return (
      <StyledPage>
        {this.state.loading && <Spinner />}
        <h1>{issueName}</h1>
        <StyledUnorderedList>
          {
            articlesByIssue.map(article => <ArticlesItem
              key={article._id}
              id={article._id}
              name={article.name}
              author={article.user}
              text={article.text}
              date={article.date}
              selected={article.selected}
            />)
          }
        </StyledUnorderedList>
        {
          topicsInIssue.map(topic => <button onClick={() => this.setState({ topicSelected: topic })}>{topic}</button>)
        }
        <button onClick={() => this.setState({ topicSelected: '' })}>all</button>
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
