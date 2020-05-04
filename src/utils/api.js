import {
  _getUsers,
  _getUser,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA';

const getUsers = () => _getUsers();
const getUser = id => _getUser(id);
const getQuestions = () => _getQuestions();
const saveQuestion = question => _saveQuestion(question);
const saveAnswer = answer => _saveQuestionAnswer(answer);

export {
  getUsers,
  getUser,
  getQuestions,
  saveQuestion,
  saveAnswer
};