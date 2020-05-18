import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { 
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row 
} from 'react-bootstrap';
import { handleAddAnswer } from '../actions/shared';
import PageNotFound from './PageNotFound';

class QuestionPoll extends React.Component {
  state = {
    optionSelected: '',
    answerSubmitted: false
  };

  handleInputChange = event =>
    this.setState({ 
      optionSelected: event.target.value
    });

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

    if (pageNotFound) return <PageNotFound />;
    if (answerSubmitted) return <Redirect to={`/question/${id}/results`} />;

    console.log(optionSelected);

    return (
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Card className='p-5' style={{ width: '60%' }}>
            <Card.Title>
              {author.name} asks would you rather...
            </Card.Title>
            <Container>
              <Row>
                <Image
                  src={author.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  roundedCircle
                  style={{
                    height: '6rem',
                    width: '6rem'
                  }}
                />
                <Col xs={8}>
                  <Form>
                    <Form.Row>
                      <Form.Group 
                        as={Col}
                        className='mr-2 ml-2 mb-1'
                      >
                        <Form.Check
                            inline
                            type='radio'
                            name='questionPoll'
                            id='optionOne'
                            value='optionOne'
                            onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor='optionOne' className='mb-0'>
                          {question.optionOne.text}
                        </Form.Label>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className='align-middle'>
                      <Form.Group
                        as={Col}
                        className='ml-2 mr-2'
                      >
                        <Form.Check
                            inline
                            type='radio'
                            name='questionPoll'
                            id='optionTwo'
                            value='optionTwo'
                            onChange={this.handleInputChange}
                        />
                        <Form.Label htmlFor='optionTwo'>
                          {question.optionTwo.text}
                        </Form.Label>
                      </Form.Group>
                    </Form.Row>
                    <Button
                      disabled={!optionSelected}
                      onClick={e => this.handleSubmit(e, id)}
                    >
                      Submit
                    </Button>
                  </Form>            
                </Col>
              </Row>
            </Container>
          </Card>
        </Row>
      </Container>
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