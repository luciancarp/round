import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import TextFieldGroup from '../components/common/TextFieldGroup'
import StyledButtonRight from '../components/layout/StyledButtonRight'
import StyledButton from '../components/common/StyledButton'
import BackButton from '../components/common/BackButton'
import { Dropzone } from '../components/Dropzone'
import isEmpty from '../utils/isEmpty'
import Spinner from '../components/common/Spinner'

import {
  createIssue,
  uploadImage,
  setNewIssueCover,
  setUploadingIssueCover
} from '../actions/issuesActions'

class IssueNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      description: '',
      errors: {},
      uploading: false,
      loading: false,
      coverSelected: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.upload = this.upload.bind(this)
    this._handleCoverSelected = this._handleCoverSelected.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
      if (!isEmpty(this.props.errors)) {
        this.setState({
          loading: false
        })
      }
    }

    if (
      prevProps.issues.uploadingIssueCover === false &&
      this.props.issues.uploadingIssueCover === true
    ) {
      this.setState({
        uploading: true
      })
    }

    // if (
    //   prevProps.issues.newIssueCover !== this.props.issues.newIssueCover &&
    //   this.props.issues.newIssueCover !== ''
    // ) {
    //   const { user } = this.props.auth

    //   const newIssue = {
    //     name: this.state.name,
    //     description: this.state.description,
    //     user: user.id,
    //     avatar: user.avatar,
    //     cover: this.props.issues.newIssueCover
    //   }

    //   this.props.createIssue(newIssue)
    //   this.setState({
    //     text: '',
    //     description: '',
    //     loading: false
    //   })
    //   this.props.setNewIssueCover('')
    //   this.props.history.push(`/`)
    // }
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.state.coverSelected) {
      const { user } = this.props.auth

      const newIssue = {
        name: this.state.name,
        description: this.state.description,
        user: user.id,
        avatar: user.avatar
      }

      this.props.createIssue(newIssue)
    } else window.alert('You need to upload a cover for this issue!')
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  upload(file) {
    const img = new FormData()
    img.append('image', file)
    this.setState({
      loading: true
    })
    this.props.uploadImage(
      img,
      this.props.issues.newIssueId,
      this.props.history
    )
    this.setState({
      uploading: false
    })
    this.props.setUploadingIssueCover({
      uploadingIssueCover: false,
      newIssueId: ''
    })
  }

  _handleCoverSelected() {
    this.setState({
      coverSelected: true
    })
  }

  render() {
    const { errors } = this.state
    return (
      <StyledPage>
        <BackButton path={'/profile'} />
        {this.state.loading && <Spinner />}

        {(!this.state.loading || this.state.uploading) && (
          <StyledNarrowSection>
            <h1>New Issue</h1>
            <form onSubmit={this.onSubmit}>
              <div>
                <p>Title of the Issue</p>
                <TextFieldGroup
                  placeholder=''
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <p>Description</p>
                <TextFieldGroup
                  placeholder=''
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <p>Upload the cover for this issue</p>
                <Dropzone
                  upload={this.upload}
                  handleCoverSelected={this._handleCoverSelected}
                  uploading={this.state.uploading}
                />
              </div>
              <StyledButtonRight>
                <StyledButton big type='submit'>
                  Publish
                </StyledButton>
              </StyledButtonRight>
            </form>
            {/* <div>{this.props.issues.newIssueCover}</div> */}
          </StyledNarrowSection>
        )}
      </StyledPage>
    )
  }
}

IssueNew.propTypes = {
  auth: PropTypes.object.isRequired,
  createIssue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createIssue, uploadImage, setNewIssueCover, setUploadingIssueCover }
)(IssueNew)
