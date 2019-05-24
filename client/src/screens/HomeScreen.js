import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import StyledSpacedPage from '../components/StyledSpacedPage'
import IssuesItem from '../components/IssuesItem'
import Spinner from '../components/common/Spinner'
import StyledUnorderedList from '../components/layout/StyledUnorderedList'
import FadeTransition from '../components/FadeTransition'
import FadeWrapper from '../components/FadeWrapper'
// import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import Footer from '../components/Footer'
import LatestIssue from '../components/LatestIssue'

import { getIssues } from '../actions/issuesActions'

const StyledWrapper = styled.div``

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
    let latestIssue = {}
    if (issues.length > 0) latestIssue = issues[0]

    return (
      <StyledSpacedPage>
        <StyledWrapper>
          {this.state.loading && <Spinner />}

          <FadeTransition in={!this.state.loading}>
            <FadeWrapper>
              <LatestIssue
                title={latestIssue.name}
                cover={latestIssue.cover}
                onClick={() =>
                  this.props.history.push(`/issue/${latestIssue._id}`)
                }
              />
            </FadeWrapper>
          </FadeTransition>

          <h1>{this.state.title}</h1>
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
        </StyledWrapper>
        <Footer />
      </StyledSpacedPage>
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
