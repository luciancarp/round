import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import IssuesItem from '../components/IssuesItem'
import TextFieldGroup from '../components/common/TextFieldGroup'

import { getIssues, createIssue } from '../actions/issuesActions'

class IssueNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      description: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      })
    }
  }

  componentDidMount () {
    this.props.getIssues()
  }

  onSubmit (e) {
    e.preventDefault()

    const { user } = this.props.auth

    const newIssue = {
      name: this.state.name,
      description: this.state.description,
      user: user.id,
      avatar: user.avatar
    }

    this.props.createIssue(newIssue)
    this.setState({
      text: '',
      description: '' })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { issues } = this.props.issues
    const { errors } = this.state
    return (
      <StyledPage>
        <StyledTitle>New Issue</StyledTitle>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextFieldGroup
              placeholder='Title'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder='Description'
              name='description'
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />
            <p>{JSON.stringify(errors)}</p>
          </div>
          <button type='submit'>
                Submit
          </button>
        </form>
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

IssueNew.propTypes = {
  auth: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getIssues, createIssue }
)(IssueNew)
