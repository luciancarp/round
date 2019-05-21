import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledPage from '../components/layout/StyledPage'
import StyledNarrowSection from '../components/layout/StyledNarrowSection'
import StyledButtonRight from '../components/layout/StyledButtonRight'
import StyledTitle from '../components/layout/StyledTitle'
import TextFieldGroup from '../components/common/TextFieldGroup'
import SelectListGroup from '../components/common/SelectListGroup'
import TextEditor from '../components/TextEditor'
import Spinner from '../components/common/Spinner'
import StyledButton from '../components/common/StyledButton'
import BackButton from '../components/common/BackButton'

import { getIssues, createIssue } from '../actions/issuesActions'
import { createArticle } from '../actions/articlesActions'

const topics = [
  { label: 'Health', value: 'Health' },
  { label: 'Language', value: 'Language' },
  { label: 'Personal Development', value: 'Personal Development' },
  { label: 'Photography', value: 'Photography' },
  { label: 'Music', value: 'Music' },
  { label: 'Lifestyle', value: 'Lifestyle' },
  { label: 'Politics', value: 'Politics' },
  { label: 'Story', value: 'Story' },
  { label: 'Tech', value: 'Tech' },
  { label: 'Productivity', value: 'Productivity' },
  { label: 'Travel', value: 'Travel' },
  { label: 'History', value: 'History' },
  { label: 'Fitness', value: 'Fitness' },
  { label: 'Other', value: 'Other' }
]

class ArticleNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      issue: '',
      topic: topics[0].value,
      topicOther: '',
      errors: {},
      getContent: false,
      content: '',
      loading: true
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getContent = this.getContent.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      })
    }

    if (this.state.issue === '' && this.props.issues.issues.length > 0) {
      this.setState({
        issue: this.props.issues.issues[0]._id,
        loading: false
      })
    }

    // if content received from text editor, continue creating the article
    if (prevState.getContent === true && this.state.getContent === false) {
      const { user } = this.props.auth
      const topic =
        this.state.topic === 'Other' ? this.state.topicOther : this.state.topic

      const newArticle = {
        name: this.state.name,
        text: this.state.content,
        avatar: user.avatar,
        issue: this.state.issue,
        topic: topic
      }

      this.props.createArticle(newArticle, this.props.history)
      this.setState({
        name: '',
        description: '',
        topic: '',
        topicOther: '',
        content: '',
        loading: false
      })
    }
  }

  componentDidMount() {
    this.props.getIssues()
  }

  onSubmit(e) {
    e.preventDefault()

    // enable to get content from TextEditor
    this.setState({
      getContent: true,
      loading: true
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getContent(rawContent) {
    this.setState({
      content: rawContent,
      getContent: false
    })
  }

  render() {
    const { issues } = this.props.issues
    const { errors } = this.state

    let issuesOptions = []
    issues.forEach(issue => {
      issuesOptions.push({ label: `${issue.name}`, value: `${issue._id}` })
    })
    return (
      <StyledPage>
        <BackButton path={'/profile'} />
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <StyledNarrowSection>
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
                <SelectListGroup
                  placeholder='Topic'
                  name='topic'
                  value={this.state.topic}
                  sendContentFunction
                  onChange={this.onChange}
                  options={topics}
                  error={errors.topic}
                  info='Select a topic for this article'
                />
                {this.state.topic === 'Other' && (
                  <TextFieldGroup
                    placeholder='New Topic'
                    name='topicOther'
                    value={this.state.topicOther}
                    onChange={this.onChange}
                    error={errors.topic}
                  />
                )}
              </div>

              <TextEditor
                sendContent={this.state.getContent}
                sendContentFunction={this.getContent}
              />

              <StyledButtonRight>
                <StyledButton big type='submit'>
                  Submit
                </StyledButton>
              </StyledButtonRight>
            </form>
            <p>{this.state.content}</p>
          </StyledNarrowSection>
        )}
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

export default connect(
  mapStateToProps,
  { getIssues, createIssue, createArticle }
)(ArticleNew)
