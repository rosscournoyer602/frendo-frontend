/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class UpdateInfo extends Component {

  getFormValues() {
    // // eslint-disable-next-line no-shadow
    // const { trySignUp } = this.props;
    // const email = document.getElementById("email").value;
    // const password = document.getElementById("password").value;
    // const confirmPassword = document.getElementById("confirmPassword").value;
    // // TODO - More strict field validation
    // if (password === confirmPassword) {
    //   trySignUp(email, password, confirmPassword);
    //   document.getElementById("signUpForm").reset();
    // }
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match!');
    // }
  }

  render() {
    return (
      <form className="auth-form" id="infoForm">
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="firstName">First Name: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="firstName" id="firstname" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="lastName">Last Name: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="lastName" id="lastname" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="dob">Birthday: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="date" name="dob" id="dob" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="address">Street Address: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="address" id="address" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="city">City: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="city" id="city" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="state">State: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="state" id="state" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="phone">Phone: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="tel" name="phone" id="phone" required />
        </div>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="email">Email: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="email" name="email" id="email" required />
        </div>
        <div className="form-field">
          <input className="form-button" type="button" value="Update Info" onClick={() => this.getFormValues()} />
        </div>
      </form>
    );
  }
}

// SignUp.propTypes = {
//   trySignUp: PropTypes.func.isRequired
// };

// const mapStateToProps = state => {
//   const { authStatus } = state;
//   return {
//     authStatus
//   };
// };

// const mapDispatchToProps = (dispatch) => bindActionCreators( { trySignUp }, dispatch);

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(UpdateInfo);
