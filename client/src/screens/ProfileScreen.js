import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/authActions'
import { getWriters } from '../actions/profileActions'
import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import StyledTitleActions from '../components/StyledTitleActions'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import BackButton from '../components/common/BackButton'
import StyledButton from '../components/common/StyledButton'
import NewWriter from '../components/NewWriter'
import WriterItem from '../components/WriterItem'
import FadeTransition from '../components/FadeTransition'
// import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import { palette } from '../styles/styles'
import styled from 'styled-components'

const StyledRole = styled.span`
  color: ${palette.primaryColor};
`

class ProfileScreen extends Component {
  constructor() {
    super()
    this.state = {
      role: '',
      loadingWriters: true
    }
  }

  componentDidMount() {
    if (this.props.auth.user.role === '2') {
      this.props.history.push('/')
    }
    this.setState({
      role: this.props.auth.user.role
    })

    if (this.props.auth.user.role === '0') {
      this.props.getWriters()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.writers !== this.props.profile.writers) {
      this.setState({
        loadingWriters: false
      })
    }
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.logOutUser()
  }

  render() {
    let role = ''
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === '0') {
        role = 'Admin'
      } else {
        role = 'Writer'
      }
    }

    let name = ''
    if (this.props.auth.isAuthenticated)
      name = this.props.auth.user.name.split(' ')

    let displayName = name[0]
    if (name.length > 1) displayName = name[0] + ' ' + name[name.length - 1]

    const { writers } = this.props.profile
    return (
      <StyledPage>
        <BackButton path={'/'} />

        <StyledTitleActions>
          <StyledTitle>
            <StyledRole>{displayName}</StyledRole>
          </StyledTitle>
          <span>•</span>
          <StyledButton onClick={e => this.onLogoutClick(e)}>
            Log Out
          </StyledButton>
        </StyledTitleActions>
        <StyledTitleActions>
          <StyledTitle>
            {/* <StyledRole>{`${role} `}</StyledRole> */}
            {role}
          </StyledTitle>

          {(this.props.auth.user.role === '0' ||
            this.props.auth.user.role === '1') && (
            <span>
              <span>•</span>
              <StyledButton
                onClick={() => this.props.history.push('/new-article')}
              >
                New Article
              </StyledButton>
            </span>
          )}

          {this.props.auth.user.role === '0' && (
            <span>
              <span>•</span>
              <StyledButton
                onClick={() => this.props.history.push('/new-issue')}
              >
                New Issue
              </StyledButton>
            </span>
          )}
        </StyledTitleActions>

        {this.props.auth.user.role === '0' && (
          <div>
            <StyledTitleActions>
              <StyledTitle>Writers</StyledTitle>
              <span>•</span>
              <NewWriter />
            </StyledTitleActions>
            <FadeTransition in={!this.state.loadingWriters}>
              <StyledUnorderedList>
                {writers.map(writer => (
                  <WriterItem name={writer.name} id={writer._id} />
                ))}
              </StyledUnorderedList>
            </FadeTransition>
          </div>
        )}
      </StyledPage>
    )
  }
}

ProfileScreen.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
})

export default connect(
  mapStatetoProps,
  { logOutUser, getWriters }
)(ProfileScreen)
