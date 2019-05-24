import axios from 'axios'

import {
  GET_ISSUES,
  CREATE_ISSUE,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_NEW_ISSUE_COVER,
  DELETE_ISSUE,
  UPLOADING_ISSUE_COVER
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
      // dispatch({
      //   type: CREATE_ISSUE,
      //   payload: res.data
      // })
      dispatch(
        setUploadingIssueCover({
          uploadingIssueCover: true,
          newIssueId: res.data._id
        })
      )
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
export const uploadImage = (file, issueId, history) => dispatch => {
  axios
    .post('/api/issues/upload-image', file)

    .then(res => {
      dispatch(setNewIssueCover(res.data.data.url))

      axios
        .post(`/api/issues/add-cover/${issueId}`, { cover: res.data.data.url })
        .then(res => {
          dispatch({
            type: CREATE_ISSUE,
            payload: res.data
          })
          history.push(`/`)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

export const setNewIssueCover = url => {
  return {
    type: SET_NEW_ISSUE_COVER,
    payload: url
  }
}

export const setUploadingIssueCover = uploading => {
  return {
    type: UPLOADING_ISSUE_COVER,
    payload: uploading
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
