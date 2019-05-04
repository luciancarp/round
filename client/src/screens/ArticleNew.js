import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'
import TextFieldGroup from '../components/common/TextFieldGroup'
import SelectListGroup from '../components/common/SelectListGroup'

import { getIssues, createIssue } from '../actions/issuesActions'
import { createArticle } from '../actions/articlesActions'

class ArticleNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      description: '',
      issue: '',
      topic: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  // componentWillReceiveProps (newProps) {
  //   if (newProps.errors) {
  //     this.setState({
  //       errors: newProps.errors
  //     })
  //   }
  // }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
    }

    if (this.state.issue === '' && this.props.issues.issues.length > 0) {
      this.setState({
        issue: this.props.issues.issues[0]._id
      })
    }
  }

  componentDidMount () {
    this.props.getIssues()
  }

  onSubmit (e) {
    e.preventDefault()

    const { user } = this.props.auth

    const newArticle = {
      name: this.state.name,
      text: this.state.text,
      avatar: user.avatar,
      issue: this.state.issue,
      topic: this.state.topic
    }

    this.props.createArticle(newArticle)
    this.setState({
      name: '',
      text: '',
      description: '',
      topic: ''
    })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    const { issues } = this.props.issues
    const { errors } = this.state

    let issuesOptions = []
    issues.forEach(issue => {
      issuesOptions.push({ label: `${issue.name}`, value: `${issue._id}` })
    })
    return (
      <StyledPage>
        <StyledTitle>New Article</StyledTitle>
        <SelectListGroup
          placeholder='Issue'
          name='issue'
          value={this.state.issue}
          onChange={this.onChange}
          options={issuesOptions}
          error={errors.issue}
          info='Select the issue in which to post this article'
        />
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
              placeholder='topic'
              name='topic'
              value={this.state.topic}
              onChange={this.onChange}
              error={errors.topic}
            />
            <TextFieldGroup
              placeholder='text'
              name='text'
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
            />
            <p>{JSON.stringify(errors)}</p>
          </div>
          <button type='submit'>
                Submit
          </button>
        </form>
      </StyledPage>
    )
  }
}

ArticleNew.propTypes = {
  auth: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth,
  errors: state.errors,
  articles: state.articles
})

export default connect(mapStateToProps, { getIssues, createIssue, createArticle })(ArticleNew)
