import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteComment } from '../actions/articlesActions'

import StyledButton from './common/StyledButton'

class CommentItem extends Component {
  render () {
    const { comment, auth, articleId } = this.props

    return (
      <div>
        <p>{comment.text}</p>
        { comment.user === auth.user.id && (
          <StyledButton
            onClick={() => this.props.deleteComment(articleId, comment._id)}
            type='button'
          >delete
          </StyledButton>
        )}
      </div>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
