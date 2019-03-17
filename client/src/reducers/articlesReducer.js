import {
  GET_ARTICLES_BY_ISSUE,
  CREATE_ARTICLE
} from '../actions/types'

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
    case CREATE_ARTICLE:
      return {
        ...state,
        articlesByIssue: [action.payload, ...state.articlesByIssue]
      }
    default:
      return state
  }
}
