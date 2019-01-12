/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import trySignUp from '../actions/trySignUp';

class SignUp extends Component {

  getFormValues() {
    // eslint-disable-next-line no-shadow
    const { trySignUp } = this.props;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // TODO - More strict field validation
    if (password === confirmPassword) {
      trySignUp(email, password, confirmPassword);
      document.getElementById("signUpForm").reset();
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
    }
  }

  render() {
    const { authStatus } = this.props;
    if (authStatus) return <Redirect to="/" />;

    return (
      <form className="auth-form" id="signUpForm">
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="email">Email: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="email" id="email" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="password">Password: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="password" name="password" id="password" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="password" name="confirmPassword" id="confirmPassword" required />
        </div>
        <div className="form-field">
          <input className="form-button" type="button" value="Register" onClick={() => this.getFormValues()} />
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  trySignUp: PropTypes.func.isRequired,
  authStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators( { trySignUp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
