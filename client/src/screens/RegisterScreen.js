import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../actions/authActions'
import TextFieldGroup from '../components/common/TextFieldGroup'
import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import StyledButton from '../components/common/StyledButton'
import StyledButtonRight from '../components/layout/StyledButtonRight'
import Footer from '../components/Footer'

class RegisterScreen extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <StyledPage>
        <StyledNarrowSection>
          <h1>Register</h1>
          <p>Name</p>
          <form noValidate onSubmit={e => this.onSubmit(e)}>
            <TextFieldGroup
              placeholder='Jane Doe'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <p>Email Address</p>
            <TextFieldGroup
              placeholder='jane@round.com'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              info='This site uses Gravatar so, if you want a profile image, use
                  a Gravatar email'
            />
            <p>Password</p>
            <TextFieldGroup
              placeholder=''
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <p>Confirm Password</p>
            <TextFieldGroup
              placeholder=''
              name='password2'
              type='password'
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />

            <StyledButtonRight>
              <StyledButton big type='submit'>
                Register
              </StyledButton>
            </StyledButtonRight>
          </form>
        </StyledNarrowSection>
        <Footer />
      </StyledPage>
    )
  }
}

RegisterScreen.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterScreen))
