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

import { spaces } from '../styles/styles'

import { getArticle } from '../actions/articlesActions'

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

  render() {
    return (
      <StyledPage>
        <BackButton path={`/issue/${this.state.issue}`} />
        {this.state.loading && <Spinner />}
        <FadeTransition in={!this.state.loading}>
          <FadeWrapper>
            <h1>{this.state.name}</h1>
            <small>{<DateText date={this.state.date} />}</small>
            <StyledText>
              <Editor
                blockRendererFn={mediaBlockRenderer}
                editorState={this.state.editorState}
                readOnly
              />
            </StyledText>
            <StyledNarrowSection>
              <StyledSubTitle>Post a comment</StyledSubTitle>
              <CommentInput ArticleId={this.state.id} />
              <h3>Comments</h3>
              <Comments
                articleId={this.state.id}
                comments={this.state.comments}
              />
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
  { getArticle }
)(ArticleScreen)
