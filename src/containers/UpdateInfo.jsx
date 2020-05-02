/* eslint-disable react/forbid-prop-types */
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
import updateAvatar from '../actions/updateAvatar';
import ImageCropper from './ImageCropper';
import Modal from '../components/Modal';

class UpdateInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInputMode: '',
      cropButton: 'disabled',
      imageSrc: null,
      showModal: false
    }

    this.handleCrop = this.handleCrop.bind(this);
    this.setState = this.setState.bind(this);
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  getFormValues() {
    const personData = {};
    const { addPerson, currentUser } = this.props;
    personData.first_name = document.getElementById('firstname').value ? document.getElementById('firstname').value : '';
    personData.last_name = document.getElementById('lastname').value ? document.getElementById('lastname').value : '';
    personData.email = currentUser.email;
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
        const data = ctx.canvas.toDataURL('image/jpeg', .8);
        this.setState({
          fileInputMode: 'behind',
          cropButton: '',
          imageSrc: data
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = '';
  };
  
  handleCrop(data) {
    const { updateAvatar } = this.props;
    updateAvatar(data);
    this.setState({
      fileInputMode: '',
      cropButton: 'disabled',
    });
  }

  render() {
    const { fileInputMode, cropButton, imageSrc } = this.state;
    return (
      <>
      <form className="auth-form" id="infoForm">
        <div className="form-field">
          <input className={`form-file-input ${fileInputMode}`} accept="image/*" onChange={(e) => this.handleFile(e)} type="file" name="avatar" id="avatar" />
        </div>
        <ImageCropper handleCrop={this.handleCrop} imageSrc={imageSrc} cropButton={cropButton} />
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
        <div className="form-field">
          <input className="btn form-button" type="button" value="Update Info" onClick={() => this.getFormValues()} />
        </div>
      </form>
      {this.state.showModal &&
        <Modal 
          title="Nice!" 
          message="Yyayyayayayayayyyayay" 
          onModalOk={() => this.setState({ showModal: false})} 
          cancelButton
          onModalCancel={() => this.setState({ showModal: false})}
        />
      }
      </>
    );
  }
}

UpdateInfo.propTypes = {
  addPerson: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators( { addPerson, updateAvatar }, dispatch);

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfo);
