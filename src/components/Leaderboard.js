import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = ({ users }) => {
  const usersInfo = Object.keys(users)
    .map(key => {
      const questionsAnswered = Object.keys(users[key].answers).length;
      const questionsAsked = Object.keys(users[key].questions).length;

      return {
        'name': users[key].name,
        'avatar': users[key].avatarURL,
        'questionsAnswered': questionsAnswered,
        'questionsAsked': questionsAsked,
        'totalScore': questionsAsked + questionsAnswered
      };
    });
  
  usersInfo.sort((a,b) => {
    if (b.totalScore < a.totalScore) return -1;
    if (b.totalScore > a.totalScore) return 1;

    return 0;
  });

  return (
    <div>
      {usersInfo.map((user, index) =>(
        <div key={index}>
          <div>
            <img src={user.avatar} alt={`Avatar of ${user.name}`} />
          </div>
          <div>
            <p>Answered Questions: {user.questionsAnswered}</p>
            <p>Asked questions: {user.questionsAsked}</p>
            <p>Total Score: {user.totalScore}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({users}) => ({
  users
});

export default connect(mapStateToProps)(Leaderboard);