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
        <button onClick={e => this.onLogoutClick(e)}>Log Out</button>
        <button onClick={() => this.props.history.push('/new-article')}>New Article</button>
        <button onClick={() => this.props.history.push('/new-issue')}>New Issue</button>
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
