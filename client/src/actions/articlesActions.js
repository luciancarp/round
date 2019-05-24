import axios from 'axios'

import {
  GET_ARTICLES_BY_ISSUE,
  GET_ARTICLE,
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLES_USER
} from './types'

// get article by id
export const getArticle = id => dispatch => {
  axios
    .get(`/api/articles/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ARTICLE,
        payload: {}
      })
    })
}

// get article by issue
export const getArticlesByIssue = id => dispatch => {
  axios
    .get(`/api/articles/from-issue/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLES_BY_ISSUE,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ARTICLES_BY_ISSUE,
        payload: {}
      })
    })
}

// get article by user
export const getArticlesUser = id => dispatch => {
  axios
    .get(`/api/articles/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLES_USER,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ARTICLES_USER,
        payload: []
      })
    })
}

// Create Article
export const createArticle = (articleData, history) => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/articles', articleData)
    .then(res => {
      dispatch({
        type: CREATE_ARTICLE,
        payload: res.data
      })
      history.push(`/article/${res.data._id}`)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteArticle = (id, issueId, history) => dispatch => {
  axios
    .delete(`/api/articles/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ARTICLE,
        payload: id
      })
      history.push(`/issue/${issueId}`)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add comment
export const addComment = (articleId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/articles/comment/${articleId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
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

// Delete comment
export const deleteComment = (articleId, commentId) => dispatch => {
  axios
    .delete(`/api/articles/comment/${articleId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_ARTICLE,
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
