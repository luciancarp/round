import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { spaces, palette } from '../styles/styles'

import { deleteComment } from '../actions/articlesActions'

import StyledButton from './common/StyledButton'
import Avatar from './common/Avatar'
import DateText from './common/DateText'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledUserName = styled.div`
  padding: ${spaces.narrow}px;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: auto;
  margin-top: ${spaces.medium}px;
  margin-bottom: ${spaces.narrow}px;
  background-color: ${palette.darkText};
`

const StyledText = styled.div`
  padding: ${spaces.medium}px;
  padding-left: ${spaces.wide}px;
`

const StyledAvatar = styled.div`
  padding: ${spaces.narrow}px;
`

const StyledTime = styled.div`
  padding: ${spaces.narrow}px;
`

class CommentItem extends Component {
  render() {
    const { comment, auth, articleId } = this.props
    let userName = ''
    const splitUserName = comment.name.split(' ')
    if (splitUserName.length > 1) {
      userName =
        splitUserName[0] + ' ' + splitUserName[splitUserName.length - 1]
    } else {
      userName = splitUserName[0]
    }
    return (
      <div>
        <Divider />

        <StyledHeader>
          <StyledUser>
            <StyledAvatar>
              <Avatar src={comment.avatar} />
            </StyledAvatar>

            <StyledUserName>{userName}</StyledUserName>

            {comment.user === auth.user.id && (
              <div>
                <span> • </span>
                <StyledButton
                  onClick={() =>
                    this.props.deleteComment(articleId, comment._id)
                  }
                  type='button'
                >
                  delete
                </StyledButton>
              </div>
            )}
          </StyledUser>
          <StyledTime>
            <DateText date={comment.date} since />
          </StyledTime>
        </StyledHeader>
        <StyledText>{comment.text}</StyledText>
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

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
