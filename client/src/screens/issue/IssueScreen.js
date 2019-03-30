import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../../components/layout/StyledPage'
import ArticlesItem from '../../components/issue/ArticlesItem'

import { getArticlesByIssue } from '../../actions/articlesActions'

class IssueScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topicSelected: ''
    }
  }

  componentDidMount () {
    this.props.getArticlesByIssue(this.props.match.params.id)
  }

  render () {
    const { articlesByIssue } = this.props.articles
    let articleWithTopic = []
    let topicsInIssue = []
    articlesByIssue.forEach(article => {
      if (article.topic !== null && topicsInIssue.indexOf(article.topic) === -1) {
        topicsInIssue.push(article.topic)
      }
    })
    articlesByIssue.forEach(article => {
      if (article.topic === this.state.topicSelected || this.state.topicSelected === '') {
        articleWithTopic.push(article)
      }
    })
    return (
      <StyledPage>
        <h1>Issue</h1>
        {
          articleWithTopic.map(article => <ArticlesItem
            key={article._id}
            id={article._id}
            name={article.name}
            text={article.text}
            date={article.date}
          />)
        }
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
