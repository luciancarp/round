import { GET_ISSUES, CREATE_ISSUE } from '../actions/types'

const initialState = {
  issues: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES:
      return {
        ...state,
        issues: action.payload
      }
    case CREATE_ISSUE:
      return {
        ...state,
        issues: [action.payload, ...state.issues]
      }
    default:
      return state
  }
}
