import axios from 'axios'

import {
  GET_ARTICLES_BY_ISSUE,
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATE_ARTICLE
} from './types'

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
        payload: null
      })
    })
}

// Create Article
export const createArticle = articleData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/articles', articleData)
    .then(res =>
      dispatch({
        type: CREATE_ARTICLE,
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
