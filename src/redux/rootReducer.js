import { combineReducers } from 'redux'
import categoryReducer from './reducers/category/categoryReducer'
import thirdPartyReducer from './reducers/thirdParty/thirdPartyReducer'

export default combineReducers({
  category: categoryReducer,
  thirdParty: thirdPartyReducer,
})