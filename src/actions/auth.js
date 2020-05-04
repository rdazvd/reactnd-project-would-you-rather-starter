import { getUser } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'; 
const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';

const receiveAuthLogin = user => ({
  type: AUTH_LOGIN_SUCCESS,
  userAuthenticated: true,
  loggedInUser: user
});

const receiveAuthLogout = () => ({
  type: AUTH_LOGOUT_SUCCESS,
  userAuthenticated: false,
  loggedInUser: null
});

const handleLoginUser = id =>
  dispatch => {
    dispatch(showLoading());
    getUser(id).then(user => {
      dispatch(receiveAuthLogin(user));
      dispatch(hideLoading());
    });
  };

const handleLogoutUser = () =>
  dispatch => {
    dispatch(showLoading());
    dispatch(receiveAuthLogout());
    dispatch(hideLoading());
  };

export {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  handleLoginUser,
  handleLogoutUser
};