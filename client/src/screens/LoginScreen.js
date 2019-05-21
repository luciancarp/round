import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions'
import TextFieldGroup from '../components/common/TextFieldGroup'
import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'

class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated &&
      this.props.auth.isAuthenticated === true
    ) {
      this.props.history.push('/')
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    return (
      <StyledPage>
        <StyledNarrowSection>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder='Email Address'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <TextFieldGroup
              placeholder='Password'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <input type='submit' />
          </form>
        </StyledNarrowSection>
      </StyledPage>
    )
  }
}

LoginScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStatetoProps,
  { loginUser }
)(LoginScreen)
