import axios from 'axios'

import {
  GET_ISSUES
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
        payload: null
      })
    })
}
