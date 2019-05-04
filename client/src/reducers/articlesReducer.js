import {
  GET_ARTICLE,
  GET_ARTICLES_BY_ISSUE,
  CREATE_ARTICLE
} from '../actions/types'

const initialState = {
  article: {},
  articles: [],
  articlesByIssue: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload
      }
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
