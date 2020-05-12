import React from 'react';
import { connect } from 'react-redux';
import { handleGetQuestions } from "../actions/questions";

class Dashboard extends React.Component {
  state = {
    questionsToBeShowed: 'unanswered',
    activeTab: 'unanswered'
  };

  componentDidMount() {
    this.props.dispatch(handleGetQuestions())
  }

  handleTabChange = tab =>
    this.setState({
      questionsToBeShowed: tab,
      activeTab: tab 
    });

  render() {
    const { activeTab, questionsToBeShowed  } = this.state;

    return (
      <div>
        <div>
          <button onClick={() => this.handleTabChange('unanswered')}>Unanswered questions</button>
          <button onClick={() => this.handleTabChange('answered')}>Answered questions</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
})

export default connect(mapStateToProps)(Dashboard);