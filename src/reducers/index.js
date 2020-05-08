import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import auth from './auth';
import users from './users';

export default combineReducers({
  auth,
  users,
  loadingBar: loadingBarReducer
});