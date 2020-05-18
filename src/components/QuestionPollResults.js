import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  Col,
  Container,
  Image,
  Row,
  ProgressBar
} from 'react-bootstrap';
import PageNotFound from './PageNotFound';

const QuestionPollResults = ({ question, author, pageNotFound }) => {
  if (pageNotFound) return <PageNotFound />;

  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;

  const totalVotes = optionOneVotes.length + optionTwoVotes.length;
  const optionSelected = optionOneVotes.includes(author.id)
    ? 'optionOne'
    : 'optionTwo';

  const optionOneWidth = Math.round((optionOneVotes.length / totalVotes) * 100);
  const optionTwoWidth = Math.round((optionTwoVotes.length / totalVotes) * 100);

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Card className='p-5' style={{ width: '60%' }}>
          <Card.Title>Added by {author.name}</Card.Title>
          <Container>
            <Row>
              <Col xs={2}>
                <Image
                  src={author.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  roundedCircle
                  style={{
                    height: '5rem',
                    width: '5rem'
                  }}
                />
              </Col>
              <Col xs={6}>
                <Card.Body>
                  <div className='mb-4'>
                    <p>Would you rather {question.optionOne.text}?</p>
                    <ProgressBar 
                      now={optionOneWidth}
                      variant={optionSelected === 'optionOne' ? 'success' : 'info'}
                      label={optionSelected === 'optionOne' ? 'Chosen answer': ''} 
                    />
                    <p>{optionOneVotes.length} out of {totalVotes} votes.</p>
                  </div>
                  <div>
                    <p>Would you rather {question.optionTwo.text}?</p>
                    <ProgressBar
                      now={optionTwoWidth}
                      variant={optionSelected === 'optionTwo' ? 'success' : 'info'}
                      label={optionSelected === 'optionTwo' ? 'Chosen answer': ''} 
                    />
                    <p>{optionTwoVotes.length} out of {totalVotes} votes.</p>
                  </div>                  
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </Row>
    </Container>
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