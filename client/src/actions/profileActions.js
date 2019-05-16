import axios from 'axios'

import { GET_WRITERS, CLEAR_ERRORS, GET_ERRORS, ADD_WRITER } from './types'

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

export const addWriter = data => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/users/add-writer', data)
    .then(res =>
      dispatch({
        type: ADD_WRITER,
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
