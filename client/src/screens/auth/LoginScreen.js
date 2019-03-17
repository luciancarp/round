import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../../components/common/TextFieldGroup'
import StyledPage from '../../components/layout/StyledPage'

class LoginScreen extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render () {
    const { errors } = this.state
    return (
      <StyledPage>
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

export default connect(mapStatetoProps, { loginUser })(LoginScreen)
