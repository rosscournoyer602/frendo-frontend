/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import addPerson from '../actions/addPerson';
import ImageCropper from './ImageCropper';

class UpdateInfo extends Component {

  getFormValues() {
    const personData = {};
    const { addPerson } = this.props;
    personData.first_name = document.getElementById('firstname').value;
    personData.last_name = document.getElementById('lastname').value;
    personData.dob = document.getElementById('dob').value;
    personData.street_address = document.getElementById('address').value;
    personData.city = document.getElementById('city').value;
    personData.state_province = document.getElementById('state').value;
    personData.phone = document.getElementById('phone').value;
    personData.email = document.getElementById('email').value;
    // eslint-disable-next-line no-shadow
    addPerson(personData);
  }

  render() {
    return (
      <form className="auth-form" id="infoForm">
        <ImageCropper />
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
          <input className="btn form-button" type="button" value="Update Info" onClick={() => this.getFormValues()} />
        </div>
      </form>
    );
  }
}

UpdateInfo.propTypes = {
  addPerson: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators( { addPerson }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(UpdateInfo);
