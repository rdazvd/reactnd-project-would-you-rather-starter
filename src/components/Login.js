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

  handleChange = event =>
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
    const { users, userAuthenticated } = this.props;
    const { userSelected } = this.state;

    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (userAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoadingBar />
        <h2>Login</h2>
        <p>Please login as:</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <select onChange={this.handleChange}>
              <option></option>
              {
                Object.keys(users).map(user =>
                  <option 
                    key={users[user].id}
                    value={users[user].id}
                  >
                    {users[user].name}
                  </option> 
                )
              }
            </select>
          </div>
          <button disabled={!!userSelected}>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth }) => ({
  isLoading: users === null,
  users,
  userAuthenticated: auth.userAuthenticated
});

export default connect(mapStateToProps)(Login);