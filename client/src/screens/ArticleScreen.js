import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Editor, EditorState, convertFromRaw } from 'draft-js'

import StyledPage from '../components/layout/StyledPage'
import Spinner from '../components/common/Spinner'
import DateText from '../components/common/DateText'
import BackButton from '../components/common/BackButton'
import CommentInput from '../components/CommentInput'
import Comments from '../components/Comments'

import { getArticle } from '../actions/articlesActions'

class ArticleScreen extends Component {
  constructor (props) {
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

  componentDidMount () {
    this.props.getArticle(this.props.match.params.id)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.articles.article !== this.props.articles.article &&
        this.props.articles.article._id === this.props.match.params.id) {
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

  render () {
    return (
      <StyledPage>
        {this.state.loading && <Spinner />}
        <BackButton path={`/issue/${this.state.issue}`} />
        <h1>{this.state.nme}</h1>
        <small>{<DateText date={this.state.date} />}</small>
        <p>
          <Editor editorState={this.state.editorState} readOnly />
        </p>
        <h3>Comments</h3>
        <CommentInput ArticleId={this.state.id} />
        <Comments
          articleId={this.state.id}
          comments={this.state.comments}
        />
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
