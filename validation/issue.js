const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateIssueInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''

  // name Validation

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
