import React, { Component } from 'react'
import { connect } from 'react-redux';
import authUser from '../actions/authUser';

class SignIn extends Component {
  render() {
    return (
      <form className="auth-form" action="" method="get">
        <div className="form-field">
          <label className="form-label" htmlFor="name">Email: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="email" id="email" required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="email">Password: </label>
          </div>
        <div className="form-field">
          <input className="form-text-input" type="password" name="password" id="password" required />
        </div>
        <div className="form-field">
          <input className="form-button" type="submit" value="Subscribe!" />
        </div> 
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
