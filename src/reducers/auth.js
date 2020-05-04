import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS } from '../actions/auth';

const auth = (state = {}, action) => {
  switch(action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
        loggedInUser: action.loggedInUser
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
        loggedInUser: action.loggedInUser
      }
    default:
      return state;
  }
};

export default auth;