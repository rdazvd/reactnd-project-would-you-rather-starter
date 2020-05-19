import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Form,
  Row
} from 'react-bootstrap';

class NewQuestion extends React.Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toDashboard: false,
    hasSubmitted: false    
  };

  handleOptionTextChange = (event, targetOptionText) => {
    const text = event.target.value;
    this.setState({ [targetOptionText]: text });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    this.setState({ hasSubmitted: true });
    dispatch(handleAddQuestion(optionOneText, optionTwoText, () =>
      this.setState({
        optionOneText: '',
        optionTwoTExt: '',
        toDashboard: true 
      })
    ));
  };

  render() {
    const {
      optionOneText,
      optionTwoText,
      toDashboard,
      hasSubmitted
    } = this.state;

    if (toDashboard) return <Redirect to='/' />;

    return (
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Card className='p-5 mt-2'>
            <Card.Title>Create new Question</Card.Title>
            <Card.Body>
              <Card.Text>Would you rather...</Card.Text>
              <Form>
                <Form.Group>
                  <Form.Control
                    className='mb-2'
                    placeholder='Enter first option'
                    value={optionOneText}
                    onChange={e => 
                      this.handleOptionTextChange(e, 'optionOneText')
                    }
                  />
                  <Form.Control 
                    placeholder='Enter second option'
                    value={optionTwoText}
                    onChange={e => 
                      this.handleOptionTextChange(e, 'optionTwoText')
                    }
                  />
                </Form.Group>
                <Button
                  disabled={!optionOneText || !optionTwoText || hasSubmitted}
                  onClick={e => this.handleSubmit(e)}
                  type='submit'
                >
                  {hasSubmitted ? 'Submitting Question...' : 'Submit'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default connect()(NewQuestion);