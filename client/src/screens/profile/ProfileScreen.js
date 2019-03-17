import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../../actions/authActions'
import StyledPage from '../../components/layout/StyledPage'

class ProfileScreen extends Component {
  onLogoutClick (e) {
    e.preventDefault()
    this.props.logOutUser()
  }

  render () {
    return (
      <StyledPage>
        <a onClick={e => this.onLogoutClick(e)}>Log Out</a>
      </StyledPage>
    )
  }
}

ProfileScreen.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStatetoProps, { logOutUser })(ProfileScreen)
