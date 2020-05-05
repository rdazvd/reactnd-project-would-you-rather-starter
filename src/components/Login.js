import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetUsers } from '../actions/users';
import { handleLoginUser } from '../actions/auth';
import LoadingBar from 'react-redux-loading';

class Login extends React.Component {
  state = {
    selectedUser: ''
  };

  componentDidMount() {
    this.props.dispatch(handleGetUsers());
  }

  handleSelectUser = event =>
    this.setState({
      selectedUSer: event.target.value
    });
  
  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { selectedUSer } = this.state;

    dispatch(handleLoginUser(selectedUSer));
  };

  render() {
    const { users, isLoading, isAuthed } = this.props;
    const { userSelected } = this.state;

    if (isAuthed) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }

    return (
      <div>
        {isLoading ?
          null : (
          <div>
            <LoadingBar />
            <h2>Login</h2>
            <p>Please login as:</p>
            <form onSubmit={this.handleSubmit}>
              <div>
                <select onchange={this.handleChange}>
                  <option></option>
                  {
                    Object.keys(users).map(user =>
                      <option 
                        key={users[user].id}
                        value={users[user].id}
                      >
                        users[user].name
                      </option> 
                    )
                  }
                </select>
              </div>
              <button disabled={!!userSelected}>Login</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users, login }) => ({
  isLoading: users === null,
  users,
  isAuthed: login.authenticated
});

export default connect(mapStateToProps)(Login);