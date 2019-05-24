import {
  GET_ISSUES,
  CREATE_ISSUE,
  SET_NEW_ISSUE_COVER,
  DELETE_ISSUE,
  UPLOADING_ISSUE_COVER
} from '../actions/types'

const initialState = {
  issues: [],
  newIssueCover: '',
  uploadingIssueCover: false,
  newIssueId: ''
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
    case UPLOADING_ISSUE_COVER:
      return {
        ...state,
        uploadingIssueCover: action.payload.uploadingIssueCover,
        newIssueId: action.payload.newIssueId
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
