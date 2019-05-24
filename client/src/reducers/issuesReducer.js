import {
  GET_ISSUES,
  CREATE_ISSUE,
  SET_NEW_ISSUE_COVER,
  DELETE_ISSUE
} from '../actions/types'

const initialState = {
  issues: [],
  newIssueCover: ''
}

export default function(state = initialState, action) {
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

    case SET_NEW_ISSUE_COVER:
      return {
        ...state,
        newIssueCover: action.payload
      }
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(issue => issue._id !== action.payload)
      }
    default:
      return state
  }
}
