import React from 'react';
import { connect } from 'react-redux';
import { 
  Button,
  Col,
  Container,
  Row
 } from 'react-bootstrap';
import Question from './Question';

class Dashboard extends React.Component {
  state = {
    activeTab: 'unanswered'
  };
  handleTabChange = tab =>
    this.setState({
      activeTab: tab 
    });

  render() {
    const { activeTab } = this.state;
    const { questionIds } = this.props;

    return (
      <Container>
        <Row className='justify-content-center mt-4 mb-4'>
          <Col xs='auto'>
            <Button 
              onClick={() => this.handleTabChange('unanswered')}
              className='mr-1'
            >
              Unanswered questions
            </Button>
            <Button 
              onClick={() => this.handleTabChange('answered')}
              className='ml-1'
            >
              Answered questions
            </Button>
          </Col>
        </Row>
          {questionIds.map(id => (
            <Row className='justify-content-center mt-2 mb-3'>
              <Question key={id} id={id} questionSet={activeTab} />
            </Row>
          ))}
      </Container>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
})

export default connect(mapStateToProps)(Dashboard);