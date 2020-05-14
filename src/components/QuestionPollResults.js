import React from 'react';
import { connect } from 'react-redux';

const QuestionPollResults = ({ question, author, pageNotFound }) => {
  if (pageNotFound) return <p>Page not found</p>;

  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;

  const totalVotes = optionOneVotes.length + optionTwoVotes.length;
  const optionSelected = optionOneVotes.includes(author.id)
    ? 'optionOne'
    : 'optionTwo';

  const optionOneWidth = Math.round((optionOneVotes.length / totalVotes) * 100);
  const optionTwoWidth = Math.round((optionTwoVotes.length / totalVotes) * 100);

  return (
    <div>
      <div>Added by {author.name}</div>
      <div>
        <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />
      </div>
      <div>
        <p>Would you rather {question.optionOne.text}?</p>
        <div>
          <div style={{ width: `${optionOneWidth}%` }}></div>
        </div>
      </div>
      <div>
        <p>Would you rather {question.optionTwo.text}?</p>
        <div>
          <div style={{ width: `${optionTwoWidth}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({questions, users} , props) => {
  const {id} = props.match.params;
  const question = questions[id];

  return {
    id,
    question,
    author: users[question['author']],
    pageNotFound: question ? false : true
  }
};

export default connect(mapStateToProps)(QuestionPollResults);