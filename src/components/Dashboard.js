import React from 'react';
import { connect } from 'react-redux';
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
      <div>
        <div>
          <button onClick={() => this.handleTabChange('unanswered')}>Unanswered questions</button>
          <button onClick={() => this.handleTabChange('answered')}>Answered questions</button>
        </div>
        <div>
          {questionIds.map(id => 
            <Question key={id} id={id} questionSet={activeTab} />)}
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