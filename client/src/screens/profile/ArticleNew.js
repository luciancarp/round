import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../../components/layout/StyledPage'
import StyledTitle from '../../components/layout/StyledTitle'
import IssuesItem from '../../components/home/IssuesItem'
import TextFieldGroup from '../../components/common/TextFieldGroup'
import SelectListGroup from '../../components/common/SelectListGroup'
import ArticlesItem from '../../components/issue/ArticlesItem'

import { getIssues, createIssue } from '../../actions/issuesActions'
import { getArticlesByIssue, createArticle } from '../../actions/articlesActions'

class ArticleNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      description: '',
      issue: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
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
    this.props.getArticlesByIssue(this.state.issue)
  }

  onSubmit (e) {
    e.preventDefault()

    const { user } = this.props.auth

    const newArticle = {
      name: this.state.name,
      text: this.state.text,
      avatar: user.avatar,
      issue: this.state.issue
    }

    this.props.createArticle(newArticle)
    this.setState({
      name: '',
      text: ''
    })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeSelect (e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.props.getArticlesByIssue(this.state.issue))
  }

  render () {
    const { issues } = this.props.issues
    const { articlesByIssue } = this.props.articles
    const { errors } = this.state

    let issuesOptions = []
    issues.map(issue => {
      issuesOptions.push({ label: `${issue.name}`, value: `${issue._id}` })
    })
    return (
      <StyledPage>
        <StyledTitle>New Article</StyledTitle>
        <SelectListGroup
          placeholder='Issue'
          name='issue'
          value={this.state.issue}
          onChange={this.onChangeSelect}
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
        <h1>Articles from selected issue</h1>
        {
          articlesByIssue.map(article => <ArticlesItem
            key={article._id}
            id={article._id}
            name={article.name}
            text={article.text}
            date={article.date}
          />)
        }
        <h1>All issues</h1>
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

ArticleNew.propTypes = {
  auth: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  articlesByIssue: PropTypes.object.isRequired,
  getArticlesByIssue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  issues: state.issues,
  auth: state.auth,
  errors: state.errors,
  articles: state.articles
})

export default connect(mapStateToProps, { getIssues, createIssue, getArticlesByIssue, createArticle })(ArticleNew)
