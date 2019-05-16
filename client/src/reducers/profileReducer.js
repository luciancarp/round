import { GET_WRITERS, ADD_WRITER } from '../actions/types'

const initialState = {
  writers: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WRITERS:
      return {
        ...state,
        writers: action.payload
      }
    case ADD_WRITER:
      return {
        ...state,
        writers: [action.payload, ...state.writers]
      }
    default:
      return state
  }
}
