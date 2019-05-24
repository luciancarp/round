import axios from 'axios'

import {
  GET_ISSUES,
  CREATE_ISSUE,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_NEW_ISSUE_COVER,
  DELETE_ISSUE
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

export const deleteIssue = (id, history) => dispatch => {
  axios
    .delete(`/api/issues/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ISSUE,
        payload: id
      })
      history.push(`/`)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Upload issue cover
export const uploadImage = file => dispatch => {
  axios
    .post('/api/issues/upload-image', file)

    .then(res => dispatch(setNewIssueCover(res.data.data.url)))
    .catch(err => console.log(err))
}

// Set logged in user
export const setNewIssueCover = url => {
  return {
    type: SET_NEW_ISSUE_COVER,
    payload: url
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
