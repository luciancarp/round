import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/authActions'
import { getWriters } from '../actions/profileActions'
import { getIssues } from '../actions/issuesActions'
import { getArticlesUser } from '../actions/articlesActions'
import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import StyledTitleActions from '../components/StyledTitleActions'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import BackButton from '../components/common/BackButton'
import StyledButton from '../components/common/StyledButton'
import NewWriter from '../components/NewWriter'
import WriterItem from '../components/WriterItem'
import FadeTransition from '../components/FadeTransition'
import IssuesItem from '../components/IssuesItem'
import FadeWrapper from '../components/FadeWrapper'
import ArticlesItem from '../components/ArticlesItem'
// import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import { palette } from '../styles/styles'
import styled from 'styled-components'

const StyledRole = styled.span`
  color: ${palette.primaryColor};
`

class ProfileScreen extends Component {
  constructor() {
    super()
    this.state = {
      role: '',
      loadingWriters: true,
      loadingIssues: true,
      loadingArticlesUser: true,
      issues: [],
      articlesUser: []
    }
  }

  componentDidMount() {
    if (this.props.auth.user.role === '2') {
      this.props.history.push('/')
    }
    this.setState({
      role: this.props.auth.user.role
    })

    if (this.props.auth.user.role === '0') {
      this.props.getWriters()
      this.props.getIssues()
    }
    this.props.getArticlesUser(this.props.auth.user.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.writers !== this.props.profile.writers) {
      this.setState({
        loadingWriters: false
      })
    }

    if (prevProps.issues.issues !== this.props.issues.issues) {
      const { issues } = this.props.issues
      this.setState({
        loadingIssues: false,
        issues: issues
      })
    }

    if (prevProps.articles.articlesUser !== this.props.articles.articlesUser) {
      const { articlesUser } = this.props.articles
      this.setState({
        loadingArticlesUser: false,
        articlesUser: articlesUser
      })
    }
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.logOutUser()
  }

  render() {
    let role = ''
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === '0') {
        role = 'Admin'
      } else {
        role = 'Writer'
      }
    }

    let name = ''
    if (this.props.auth.isAuthenticated)
      name = this.props.auth.user.name.split(' ')

    let displayName = name[0]
    if (name.length > 1) displayName = name[0] + ' ' + name[name.length - 1]

    const { writers } = this.props.profile
    const { issues } = this.state
    const { articlesUser } = this.state
    return (
      <StyledPage>
        <BackButton path={'/'} text='Home' />

        <StyledTitleActions>
          <StyledTitle>
            <StyledRole>{role} </StyledRole>
            <span>{displayName}</span>
          </StyledTitle>
          <span>•</span>
          <StyledButton onClick={e => this.onLogoutClick(e)}>
            Log Out
          </StyledButton>
        </StyledTitleActions>

        {this.props.auth.user.role === '0' && (
          <div>
            <StyledTitleActions>
              <StyledTitle>Writers</StyledTitle>
              <span>•</span>
              <NewWriter />
            </StyledTitleActions>
            <FadeTransition in={!this.state.loadingWriters}>
              <FadeWrapper>
                <StyledUnorderedList>
                  {writers.map(writer => (
                    <WriterItem name={writer.name} id={writer._id} />
                  ))}
                </StyledUnorderedList>
              </FadeWrapper>
            </FadeTransition>
          </div>
        )}

        {(this.props.auth.user.role === '0' ||
          this.props.auth.user.role === '1') && (
          <div>
            <StyledTitleActions>
              <StyledTitle>Articles</StyledTitle>
              <span>•</span>
              <StyledButton
                onClick={() => this.props.history.push('/new-article')}
              >
                New Article
              </StyledButton>
            </StyledTitleActions>
            <FadeTransition in={!this.state.loadingArticlesUser}>
              <FadeWrapper>
                <StyledUnorderedList>
                  {articlesUser.map(article => (
                    <ArticlesItem
                      profile
                      issue={article.issue.name}
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
          </div>
        )}

        {this.props.auth.user.role === '0' && (
          <div>
            <StyledTitleActions>
              <StyledTitle>Issues</StyledTitle>
              <span>•</span>
              <StyledButton
                onClick={() => this.props.history.push('/new-issue')}
              >
                New Issue
              </StyledButton>
            </StyledTitleActions>
            <FadeTransition in={!this.state.loadingIssues}>
              <FadeWrapper>
                <StyledUnorderedList>
                  {issues.map((issue, index) => (
                    <IssuesItem
                      index
                      key={issue._id}
                      id={issue._id}
                      name={issue.name}
                      description={issue.description}
                      date={issue.date}
                    />
                  ))}
                </StyledUnorderedList>
              </FadeWrapper>
            </FadeTransition>
          </div>
        )}
      </StyledPage>
    )
  }
}

ProfileScreen.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired,
  getArticlesUser: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  issues: state.issues,
  articles: state.articles
})

export default connect(
  mapStatetoProps,
  { logOutUser, getWriters, getIssues, getArticlesUser }
)(ProfileScreen)
