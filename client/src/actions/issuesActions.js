import axios from 'axios'

import {
  GET_ISSUES,
  CREATE_ISSUE,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types'

// get issues
export const getIssues = () => dispatch => {
  axios
    .get('/api/issues')
    .then(res =>
      dispatch({
        type: GET_ISSUES,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ISSUES,
        payload: {}
      })
    })
}

// Create Issue
export const createIssue = issueData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/issues', issueData)
    .then(res =>
      dispatch({
        type: CREATE_ISSUE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
