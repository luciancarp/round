import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import styled from 'styled-components'

import { mediaBlockRenderer } from '../utils/mediaBlockRenderer'
import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import Spinner from '../components/common/Spinner'
import DateText from '../components/common/DateText'
import BackButton from '../components/common/BackButton'
import CommentInput from '../components/CommentInput'
import Comments from '../components/Comments'
import FadeTransition from '../components/FadeTransition'
import FadeWrapper from '../components/FadeWrapper'
import StyledTitle from '../components/layout/StyledTitle'
import StyledTitleActions from '../components/StyledTitleActions'
import StyledButton from '../components/common/StyledButton'
import StyledLink from '../components/common/StyledLink'

import { spaces } from '../styles/styles'

import { getArticle, deleteArticle } from '../actions/articlesActions'

const StyledSubTitle = styled.h2`
  padding-top: ${spaces.wide}px;
`

const StyledText = styled.p`
  padding-bottom: ${spaces.wide}px;
  line-height: 1.5em;
`

class ArticleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      name: '',
      date: '',
      comments: [],
      issue: '',
      loading: true
    }
  }

  componentDidMount() {
    this.props.getArticle(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.articles.article !== this.props.articles.article &&
      this.props.articles.article._id === this.props.match.params.id
    ) {
      const { article } = this.props.articles
      const { comments } = article

      const content = convertFromRaw(JSON.parse(article.text))

      this.setState({
        name: article.name,
        editorState: EditorState.createWithContent(content),
        date: article.date,
        comments: comments,
        id: article._id,
        issue: article.issue,
        loading: false
      })
    }
  }

  _handleDelete() {
    if (window.confirm('Are you sure you want to delete this article?')) {
      this.props.deleteArticle(
        this.state.id,
        this.state.issue,
        this.props.history
      )
    }
  }

  render() {
    let showDelete = false
    let showCommentInput = false
    if (this.props.auth.isAuthenticated) {
      showCommentInput = true
      const ownArticle =
        this.props.articles.article.user === this.props.auth.user.id
      // Only the writer who posted the article or an admin can delete an article
      showDelete =
        (this.props.auth.user.role === '1' && ownArticle) ||
        this.props.auth.user.role === '0'
    }

    let showComments = false
    if (this.state.comments.length > 0) showComments = true

    return (
      <StyledPage>
        <BackButton path={`/issue/${this.state.issue}`} />
        {this.state.loading && <Spinner />}
        <FadeTransition in={!this.state.loading}>
          <FadeWrapper>
            <StyledTitleActions>
              <StyledTitle>{this.state.name}</StyledTitle>
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
            <small>{<DateText date={this.state.date} />}</small>
            <StyledText>
              <Editor
                blockRendererFn={mediaBlockRenderer}
                editorState={this.state.editorState}
                readOnly
              />
            </StyledText>
            <StyledNarrowSection>
              {showCommentInput && (
                <div>
                  <StyledSubTitle>Post a comment</StyledSubTitle>
                  <CommentInput ArticleId={this.state.id} />
                </div>
              )}
              {!showCommentInput && (
                <div>
                  <StyledSubTitle>
                    You need to login to post a comment.
                  </StyledSubTitle>
                  <span>
                    <StyledLink to='/login'>Login</StyledLink>
                    <span>•</span>
                    <StyledLink to='/register'>Register</StyledLink>
                  </span>
                </div>
              )}
              {showComments && (
                <div>
                  <h3>Comments</h3>
                  <Comments
                    articleId={this.state.id}
                    comments={this.state.comments}
                  />
                </div>
              )}
            </StyledNarrowSection>
          </FadeWrapper>
        </FadeTransition>
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

export default connect(
  mapStateToProps,
  { getArticle, deleteArticle }
)(ArticleScreen)
