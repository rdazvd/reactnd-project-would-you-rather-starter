import { getUsers } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const handleGetUsers = () =>
  dispatch => {
    dispatch(showLoading());
    return getUsers()
      .then(users => {
        dispatch(receiveUsers(users));
        dispatch(hideLoading());
      });
  };

export {
  RECEIVE_USERS,
  receiveUsers,
  handleGetUsers
};