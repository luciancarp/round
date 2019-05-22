import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import IssuesItem from '../components/IssuesItem'
import Spinner from '../components/common/Spinner'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import FadeTransition from '../components/FadeTransition'
import Footer from '../components/Footer'

import { getIssues } from '../actions/issuesActions'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      issues: [],
      loading: true
    }
  }

  componentDidMount() {
    this.props.getIssues()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.issues.issues !== this.props.issues.issues) {
      const { issues } = this.props.issues
      this.setState({
        title: 'Issues',
        issues: issues,
        loading: false
      })
    }
  }

  render() {
    const { issues } = this.state
    return (
      <StyledPage>
        {this.state.loading && <Spinner />}
        <StyledTitle>{this.state.title}</StyledTitle>
        <FadeTransition in={!this.state.loading}>
          <StyledUnorderedList>
            {issues.map((issue, index) => (
              <IssuesItem
                index
                key={issue._id}
                id={issue._id}
                name={issue.name}
                description={issue.description}
                date={issue.date}
              />
            ))}
          </StyledUnorderedList>
        </FadeTransition>

        <Footer />
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
