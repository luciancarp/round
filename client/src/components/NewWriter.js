import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import StyledButton from './common/StyledButton'
import TextFieldGroup from '../components/common/TextFieldGroup'
import { addWriter } from '../actions/profileActions'

import { spaces } from '../styles/styles'

const StyledWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-left: ${spaces.narrow}px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${spaces.narrow}px;
`

class NewWriter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      showInput: false,
      errors: {},
      email: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
    }

    if (prevProps.profile.writers !== this.props.profile.writers) {
      this._showInput()
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    // const { user } = this.props.auth

    const newWriter = {
      email: this.state.email
    }

    this.props.addWriter(newWriter)
    this.setState({
      email: ''
    })

    // this._showInput()
  }

  _showInput() {
    this.setState({
      showInput: !this.state.showInput
    })
  }

  render() {
    const { errors } = this.state
    return (
      <StyledWrapper>
        {!this.state.showInput && (
          <StyledButton onClick={() => this._showInput()}>
            Add new writer
          </StyledButton>
        )}
        {this.state.showInput && (
          <StyledForm onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder='Email Address'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              noMargin
            />
            <StyledButton type='submit'>Submit</StyledButton>
          </StyledForm>
        )}
      </StyledWrapper>
    )
  }
}

NewWriter.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addWriter }
)(NewWriter)
