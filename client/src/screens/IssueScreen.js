import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import isEmpty from '../utils/isEmpty'

import StyledPage from '../components/layout/StyledPage'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import ArticlesItem from '../components/ArticlesItem'
import Spinner from '../components/common/Spinner'
import StyledButton from '../components/common/StyledButton'
import StyledTitle from '../components/layout/StyledTitle'
import StyledTitleActions from '../components/StyledTitleActions'
import BackButton from '../components/common/BackButton'
import FadeTransition from '../components/FadeTransition'
import FadeWrapper from '../components/FadeWrapper'

import { getArticlesByIssue } from '../actions/articlesActions'
import { deleteIssue, getIssues } from '../actions/issuesActions'

class IssueScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicSelected: '',
      articlesByIssue: [],
      loading: true
    }
  }

  componentDidMount() {
    this.props.getArticlesByIssue(this.props.match.params.id)
    const { issues } = this.props.issues
    if (issues.length === 0) {
      this.props.getIssues()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.articles.articlesByIssue !== this.props.articles.articlesByIssue
    ) {
      const { articlesByIssue } = this.props.articles

      this.setState({
        articlesByIssue: articlesByIssue,
        loading: false
      })
    }
  }

  _handleDelete() {
    if (
      window.confirm(
        'Are you sure you want to delete this issue? All the articles will be delete as well!'
      )
    ) {
      this.props.deleteIssue(this.props.match.params.id, this.props.history)
    }
  }

  render() {
    const { articlesByIssue } = this.state
    let showDelete = false

    // let issueName = ''
    // if (!isEmpty(articlesByIssue)) {
    //   issueName = articlesByIssue[0].issue.name
    // }

    let topicsInIssue = []
    if (articlesByIssue.length > 0) {
      articlesByIssue.forEach(article => {
        if (
          article.topic !== null &&
          topicsInIssue.indexOf(article.topic) === -1
        ) {
          topicsInIssue.push(article.topic)
        }
      })

      articlesByIssue.forEach(article => {
        article.selected = article.topic === this.state.topicSelected
      })
    }

    if (this.props.auth.isAuthenticated && this.props.auth.user.role === '0') {
      showDelete = true
    }

    let title = ''
    const { issues } = this.props.issues
    if (issues.length > 0) {
      let issue = issues.filter(
        issue => issue._id === this.props.match.params.id
      )[0]
      if (!isEmpty(issue)) title = issue.name
    }

    return (
      <StyledPage>
        <BackButton path={'/'} text='Home' />

        {this.state.loading && <Spinner />}

        <FadeTransition in={!this.state.loading}>
          <FadeWrapper>
            <StyledTitleActions>
              <StyledTitle>{title}</StyledTitle>
              {showDelete && (
                <span>
                  <span>•</span>
                  <StyledButton
                    onClick={() => {
                      this._handleDelete()
                    }}
                  >
                    delete
                  </StyledButton>
                </span>
              )}
            </StyledTitleActions>

            {topicsInIssue.map(topic => (
              <span>
                <StyledButton
                  onClick={() => this.setState({ topicSelected: topic })}
                  selected={this.state.topicSelected === topic}
                >
                  {topic}
                </StyledButton>
                <span> • </span>
              </span>
            ))}
            {topicsInIssue.length > 0 && (
              <StyledButton
                onClick={() => this.setState({ topicSelected: '' })}
              >
                clear
              </StyledButton>
            )}

            <StyledUnorderedList>
              {articlesByIssue.map(article => (
                <ArticlesItem
                  key={article._id}
                  id={article._id}
                  name={article.name}
                  author={article.user}
                  text={article.text}
                  date={article.date}
                  selected={article.selected}
                />
              ))}
            </StyledUnorderedList>
          </FadeWrapper>
        </FadeTransition>
      </StyledPage>
    )
  }
}

IssueScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  articlesByIssue: PropTypes.object.isRequired,
  getArticlesByIssue: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles,
  issues: state.issues
})

export default connect(
  mapStateToProps,
  { getArticlesByIssue, deleteIssue, getIssues }
)(IssueScreen)
