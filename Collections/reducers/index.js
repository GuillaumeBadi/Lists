import { combineReducers } from 'redux'

import collections from './collections'
import user from './user'
import pages from './pages'

export default combineReducers({
  collections,
  pages,
  user,
})
