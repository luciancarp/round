const Validator = require('validator')
const isEmpty = require('./is-empty')
const mongoose = require('mongoose')

module.exports = function validateArticleInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.issue = !isEmpty(data.issue) ? data.issue : ''
  data.topic = !isEmpty(data.topic) ? data.topic : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = 'topic field is required'
  }

  if (Validator.isEmpty(data.issue)) {
    errors.issue = 'Issue field is required'
  }

  if (!mongoose.Types.ObjectId.isValid(data.issue)) {
    errors.issue = 'Issue id is invalid'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
