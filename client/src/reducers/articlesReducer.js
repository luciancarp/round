import { GET_ARTICLES_BY_ISSUE } from '../actions/types'

const initialState = {
  articles: [],
  articlesByIssue: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_BY_ISSUE:
      return {
        ...state,
        articlesByIssue: action.payload
      }
    default:
      return state
  }
}
