/* eslint-disable class-methods-use-this */
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
  constructor(props) {
    super(props);

    this.state = {
      fileInputMode: '',
      cropButton: 'disabled',
      imageSrc: null
    }

    this.imageSrc = null;

    this.handleCrop = this.handleCrop.bind(this);
    this.setState = this.setState.bind(this);
  }

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

  handleFile(e) {
    if (!e.target.files[0]) return;
    // const selectedFile = document.getElementById('avatar').files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');    
        const width = 250;
        const scaleFactor = width / img.width;
        elem.width = width;
        const height = img.height * scaleFactor;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.canvas.toDataURL(img);
        this.setState({
          fileInputMode: 'behind',
          cropButton: '',
          imageSrc: data
        })
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  handleCrop(data) {
    console.log('HANDLECROPDATA:', data);
  }

  render() {
    const { fileInputMode, cropButton, imageSrc } = this.state;
    return (
      <form className="auth-form" id="infoForm">
        <div className="form-field">
          <input className={`form-file-input ${fileInputMode}`} accept="image/*" onChange={(e) => this.handleFile(e)} type="file" name="avatar" id="avatar" />
        </div>
        <ImageCropper handleCrop={this.handleCrop} imageSrc={imageSrc} />
        <div className="form-field">
          <input className={`btn form-button ${cropButton}`} type="button" value="Crop Image" onChange={() => this.handleCrop()} />
        </div>
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
