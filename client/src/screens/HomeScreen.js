import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import IssuesItem from '../components/IssuesItem'

import { getIssues } from '../actions/issuesActions'

class HomeScreen extends Component {
  componentDidMount () {
    this.props.getIssues()
  }

  render () {
    const { issues } = this.props.issues
    return (
      <StyledPage>
        <StyledTitle>Home</StyledTitle>
        {
          issues.map(issue => <IssuesItem
            key={issue._id}
            id={issue._id}
            name={issue.name}
            description={issue.description}
            date={issue.date}
          />)
        }
      </StyledPage>
    )
  }
}

HomeScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getIssues }
)(HomeScreen)
