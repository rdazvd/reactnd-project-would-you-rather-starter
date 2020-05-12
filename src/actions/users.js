import { getUsers } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const handleGetUsers = () =>
  dispatch => {
    dispatch(showLoading());
    return getUsers()
      .then(users => {
        dispatch(receiveUsers(users));
        dispatch(hideLoading());
      });
  };

  export const addUserQuestion = question => ({
    type: ADD_USER_QUESTION,
    question
  });

  export const addUserAnswer = (authedUser, questionId, selectedOption) => ({
    type: ADD_USER_ANSWER,
    authedUser,
    questionId,
    selectedOption
  });