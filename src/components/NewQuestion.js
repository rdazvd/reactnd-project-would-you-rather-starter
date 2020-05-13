import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';

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
      <div>
        <p>Would you rather...</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              placeholder='Enter option text here...'
              value={optionOneText}
              onChange={e => this.handleOptionTextChange(e, 'optionOneText')}
            />
          </div>
          <div>
            <input
              placeholder='Enter option text here...'
              value={optionTwoText}
              onChange={e => this.handleOptionTextChange(e, 'optionTwoText')}
            />
          </div>
          <input
            type='submit'
            name='submit'
            id='submit'
            value={hasSubmitted ? 'Submitting Question...' : 'Submit'}
            disabled={!optionOneText || !optionTwoText || hasSubmitted}
          />
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);