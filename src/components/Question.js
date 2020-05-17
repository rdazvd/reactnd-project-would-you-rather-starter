import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Button,
  Card,
  Col,
  Container,
  Image,
  Row 
} from 'react-bootstrap';
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
      <Container className='mb-1'>
        <Row className='justify-content-center'>
          <Card className='p-5' style={{ width: '60%' }}>
            <Card.Title>{question.name} asks "Would you rather..."</Card.Title>
            <Container>
              <Row>
                <Col xs={2}>
                  <Image 
                    src={question.avatar}
                    alt={`Avatar of ${question.name}`}
                    roundedCircle
                    style={{
                      height: '5rem',
                      width: '5rem'
                    }}
                  />
                </Col>
                <Col xs={10}>
                  <Card.Body>       
                    <Card.Text>{question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}</Card.Text>
                    <Link to={viewPollLink}><Button>View Poll</Button></Link>
                  </Card.Body>
                </Col>
              </Row>
            </Container>
          </Card>
        </Row>
      </Container>
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