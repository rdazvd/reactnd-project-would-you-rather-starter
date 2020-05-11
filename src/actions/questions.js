import { getQuestions } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});

export const addQuestion = question => ({
  type: ADD_QUESTION,
  question
});

export const addAnswer = (authedUser, questionId, selectedOption) => ({
  type: ADD_ANSWER,
  authedUser,
  questionId,
  selectedOption
});

export const handleGetQuestions = () =>
  dispatch => {
    dispatch(showLoading());
    return getQuestions()
      .then(questions => {
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };