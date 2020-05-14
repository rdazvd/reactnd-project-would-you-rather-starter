import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddAnswer } from '../actions/shared';

class QuestionPoll extends React.Component {
  state = {
    optionSelected: '',
    answerSubmitted: false
  };

  handleSubmit = (event, questionId) => {
    event.preventDefault();

    const {dispatch} = this.props;
    const {optionSelected} = this.state;

    dispatch(handleAddAnswer(questionId, optionSelected));

    this.setState({
      optionSelected: '',
      answerSubmitted: true
    });
  };

  render() {
    const { optionSelected, answerSubmitted } = this.state;
    const { id, question, author, pageNotFound } = this.props;
    console.log(question);
    if (pageNotFound) return <p>Page not found</p>;
    if (answerSubmitted) return <Redirect to={`/question/${id}/results`} />;

    return (
      <div>
        <div>{author.name} asks would you rather...</div>
        <div>
          <img 
            src={author.avatarURL}
            alt={`Avatar of ${author.name}`} 
          />
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e, id)}>
            <div>
              <input
                type='radio'
                name='questionPoll'
                id='optionOne'
                value='optionOne'
                onChange={this.handleInputChange}
              />
              <label htmlFor={'optionOne'}>
                {question.optionOne.text}
              </label>
            </div>
            <div>
              <input
                type='radio'
                name='questionPoll'
                id='optionTwo'
                value='optionTwo'
                onChange={this.handleInputChange}
              />
              <label htmlFor='optionTwo'>
                {question.optionTwo.text}
              </label>
            </div>
            <button disabled={!!optionSelected}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, questions, users }, props) => {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    id,
    question,
    author: users[question['author']],
    authedUser: auth.loggedInUser.id,
    pageNotFound: question ? false : true
  }
};

export default connect(mapStateToProps)(QuestionPoll);