import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Col,
  Container,
  Image,
  Row 
} from 'react-bootstrap';

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
    <Container className='mt-5'>
      {usersInfo.map((user, index) =>(
        <Row key={index} className='justify-content-center'>
          <Card className='p-4 mt-2 mb-3' style={{ width: '60%' }}>
            <Card.Title>{user.name}</Card.Title>
            <Row className='align-items-center'>
              <Col xs={2}>
                <Image
                  src={user.avatar}
                  alt={`Avatar of ${user.name}`}
                  roundedCircle
                  style={{
                    height: '5rem',
                    width: '5rem'
                  }}
                />
              </Col>
              <Col xs={5}>
                <p>Answered Questions: {user.questionsAnswered}</p>
                <p>Asked questions: {user.questionsAsked}</p>
              </Col>
              <Col xs={5}>
                <h2>Total Score: {user.totalScore}</h2>
              </Col>
            </Row>
          </Card>
        </Row>
      ))}
    </Container>
  );
};

const mapStateToProps = ({users}) => ({ users });

export default connect(mapStateToProps)(Leaderboard);