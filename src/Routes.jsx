/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Welcome from './components/Welcome';
import Profile from './containers/Profile';
import FriendsList from './containers/FriendsList';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import FriendDisplay from './components/FriendDisplay';

class Routes extends Component {
  render() {
    const { authStatus } = this.props;
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        {authStatus && <Route exact path="/friends" component={FriendsList} />}
        {authStatus && (
          <Route exact path="/friend/:id" render={props => <FriendDisplay {...props} />} />
        )}
        {!authStatus && <Route exact path="/" component={Welcome} />}
        {authStatus && <Route exact path="/" component={Profile} />}
      </Switch>
    );
  }
}

Routes.propTypes = {
  authStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
