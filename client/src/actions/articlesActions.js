import axios from 'axios'

import {
  GET_ARTICLES_BY_ISSUE
} from './types'

// get issues
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
