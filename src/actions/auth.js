import { getUser } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'; 
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';

export const receiveAuthLogin = user => ({
  type: AUTH_LOGIN_SUCCESS,
  userAuthenticated: true,
  loggedInUser: user
});

export const receiveAuthLogout = () => ({
  type: AUTH_LOGOUT_SUCCESS,
  userAuthenticated: false,
  loggedInUser: null
});

export const handleLoginUser = id =>
  dispatch => {
    dispatch(showLoading());
    getUser(id).then(user => {
      dispatch(receiveAuthLogin(user));
      dispatch(hideLoading());
    });
  };

export const handleLogoutUser = () =>
  dispatch => {
    dispatch(showLoading());
    dispatch(receiveAuthLogout());
    dispatch(hideLoading());
  };