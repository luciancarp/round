import {
  GET_ARTICLE,
  GET_ARTICLES_BY_ISSUE,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLES_USER
} from '../actions/types'

const initialState = {
  article: {},
  articles: [],
  articlesByIssue: [],
  articlesUser: []
}

export default function(state = initialState, action) {
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
    case GET_ARTICLES_USER:
      return {
        ...state,
        articlesUser: action.payload
      }
    case CREATE_ARTICLE:
      return {
        ...state,
        articlesByIssue: [action.payload, ...state.articlesByIssue]
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          article => article._id !== action.payload
        )
      }
    default:
      return state
  }
}
