import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter 
} from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';

import Dashboard from './Dashboard';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';

class App extends React.Component {
  render() {
    const { loading, loggedInUser, userAuthenticated } = this.props;
    console.log(userAuthenticated);
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
                <Route path='/login' component={withRouter(Login)} />
                <Route path='/logout' component={withRouter(Logout)} />
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