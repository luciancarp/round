import { combineReducers } from 'redux'
import authReducer from './authReducer'
import issuesReducer from './issuesReducer'
import articlesReducer from './articlesReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  issues: issuesReducer,
  errors: errorReducer,
  articles: articlesReducer,
  profile: profileReducer
})
