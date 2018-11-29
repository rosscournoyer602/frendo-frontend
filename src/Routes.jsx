import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';

class Routes extends Component {
  render() {
    return (
      <>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </>
    )
  }
}

export default withRouter(Routes);