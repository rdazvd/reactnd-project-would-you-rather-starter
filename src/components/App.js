import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter 
} from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { LoadingBar } from 'react-redux-loading';

class App extends React.Component {
  render() {
    const { loading, userAuthenticated } = this.props;
    return (
      <Router>
        <>
          <LoadingBar />
          { loading ? null : (
            <div>
              <Switch>
                <ProtectedRoute 
                  exact path='/' 
                  component={Dashboard} 
                  isAuthenticated={userAuthenticated} 
                />
                <Route exact path='/login' component={withRouter(Login)} /> 
              </Switch>
            </div>
          ) }
        </>
      </Router>
    );
  } 
}

const mapStateToProps = ({ auth }) => ({
  loading: false,
  userAuthenticated: auth.userAuthenticated
});

export default connect(mapStateToProps)(App);