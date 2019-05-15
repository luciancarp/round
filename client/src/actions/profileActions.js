import axios from 'axios'

import { GET_WRITERS, CLEAR_ERRORS } from './types'

// get writers
export const getWriters = () => dispatch => {
  axios
    .get('/api/users/writers')
    .then(res =>
      dispatch({
        type: GET_WRITERS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_WRITERS,
        payload: []
      })
    })
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
