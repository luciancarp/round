import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../components/common/TextFieldGroup'
import StyledButton from '../components/common/StyledButton'
import StyledButtonRight from '../components/layout/StyledButtonRight'

import { addComment } from '../actions/articlesActions'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
    }
  }

  onSubmit (e) {
    e.preventDefault()

    const { user } = this.props.auth
    const { ArticleId } = this.props

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addComment(ArticleId, newComment)
    this.setState({ text: '' })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { errors } = this.state

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder='Share your thoughts'
            name='text'
            type='text'
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
          />
          <StyledButtonRight>
            <StyledButton big type='submit'>
          Post
            </StyledButton>
          </StyledButtonRight>

        </form>
      </div>
    )
  }
}

CommentInput.propTypes = {
  errors: PropTypes.object.isRequired,
  ArticleId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addComment }
)(CommentInput)
