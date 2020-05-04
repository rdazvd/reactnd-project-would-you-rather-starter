import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import auth from './auth';

export default combineReducers({
  auth,
  loadingBar: loadingBarReducer
});