import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetUsers } from '../actions/users';
import { handleLoginUser } from '../actions/auth';
import { 
  Button,
  Col,
  Container,
  Row 
} from 'react-bootstrap';
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
      selectedUser: event.target.value
    });
  
  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { selectedUser } = this.state;

    dispatch(handleLoginUser(selectedUser));
  };

  render() {
    const { users, userAuthenticated } = this.props;
    const { selectedUser } = this.state;

    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (userAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoadingBar />
        <Container>
          <Row 
            className='align-content-center justify-content-center'
            style={{ height: '60vh' }}
          >
            <Col xs='auto'>
              <div style={{ textAlign: 'center' }}>
                <h1>Login</h1>
                <p>Please select a user to login as below:</p>
              </div>
              <form>
                <div>
                  <select className='custom-select' onChange={this.handleChange}>
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
                <Button 
                  onClick={e => this.handleSubmit(e)}
                  disabled={selectedUser === ''}
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  Login
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
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