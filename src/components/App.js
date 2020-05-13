import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter 
} from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';

import { handleGetQuestions } from "../actions/questions";
import Dashboard from './Dashboard';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import QuestionPoll from './QuestionPoll';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleGetQuestions())
  }

  render() {
    const { loading, loggedInUser, userAuthenticated } = this.props;
    return (
      <Router>
        <>
          <LoadingBar />
          { userAuthenticated ? (
            <NavBar loggedInUser={loggedInUser} />
          ) : null }
          { loading ? null : (
            <div>
              <Switch>
                <ProtectedRoute
                  exact path='/'
                  component={Dashboard}
                  isAuthenticated={userAuthenticated}
                />
                <ProtectedRoute
                  exact path='/question/:id'
                  component={connect(mapStateToProps)(QuestionPoll)}
                  isAuthenticated={userAuthenticated}
                />
                <Route exact path='/login' component={withRouter(Login)} />
                <Route exact path='/logout' component={withRouter(Logout)} />
              </Switch>
            </div>
          ) }
        </>
      </Router>
    );
  } 
}

const mapStateToProps = ({auth}) => ({
  loading: false,
  loggedInUser: auth.loggedInUser,
  userAuthenticated: auth.userAuthenticated
});

export default connect(mapStateToProps)(App);