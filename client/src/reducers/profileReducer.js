import { GET_WRITERS } from '../actions/types'

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
    default:
      return state
  }
}
