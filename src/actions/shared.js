import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion, saveAnswer } from '../utils/api';
import { addUserQuestion, addUserAnswer } from './users';
import { addQuestion, addAnswer } from './questions';

export const handleAnswer = (questionId, selectedOption) =>
  (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    const authedUser = auth.loggedInUser.id;

    saveAnswer({
      authedUser,
      questionId,
      answer: selectedOption
    }).then(() => {
      dispatch(addAnswer(authedUser, questionId, selectedOption));
      dispatch(addUserAnswer(authedUser, questionId, selectedOption));
      dispatch(hideLoading());
    });
  };

export const handleAddQestion = (optionOneText, optionTwoText, callback) =>
  (dispatch, getState) => {
    dispatch(showLoading());

    const { auth } = getState();
    const author = auth.loggedInUser.id;

    saveQuestion({
      optionOneText,
      optionTwoText,
      author
    }).then(question => {
      dispatch(addUserQuestion(question));
      dispatch(addQuestion(question));
      dispatch(showLoading());
    }).then(callback);
  };