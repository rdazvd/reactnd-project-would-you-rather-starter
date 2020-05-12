import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';

class Question extends React.Component {
  state = { viewPollLink: '' };

  componentDidMount() {
    const { question, questionSet } = this.props;
    questionSet === 'answered' 
      ? this.setState({ viewPollLink: `/question/${question.id}/results` })
      : this.setState({ viewPollLink: `/question/${question.id}` });
  }

  render() {
    const { question, questionSet } = this.props;
    const { viewPollLink } = this.state;
    
    if (!question) return <p>This question does not exist.</p>;

    if (
      questionSet === 'answered' 
      && question.hasVoted !== true
    ) return null;
    else if (
      questionSet === 'unanswered' 
      && question.hasVoted === true
    ) return null;

    return (
      <div>
        <div>
          <img src={question.avatar} alt={`Avatar of ${question.name}`} />
        </div>
        <div>
          <p>{question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}</p>
          <Link to={viewPollLink}><button>View Poll</button></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, questions, users }, { id, questionSet }) => {
  const question = questions[id];

  return {
    authedUser: auth.loggedInUser.id,
    question: formatQuestion(question, users[question.author], auth.loggedInUser.id),
    questionSet
  };
};

export default connect(mapStateToProps)(Question);