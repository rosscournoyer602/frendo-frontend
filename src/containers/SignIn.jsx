/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import trySignIn from '../actions/trySignIn';

class SignIn extends Component {

  getFormValues() {
    // eslint-disable-next-line no-shadow
    const { trySignIn } = this.props;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // TODO - More strict field validation
    trySignIn(email, password);
  }

  render() {
    return (
      <form className="auth-form" id="signInForm">
        <div className="form-field">
          <label className="form-label" htmlFor="email">Email: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="email" id="email" required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="password">Password: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="password" name="password" id="password" required />
        </div>
        <div className="form-field">
          <input className="form-button" type="button" value="Sign In" onClick={() => this.getFormValues()} />
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  trySignIn: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators( { trySignIn }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
