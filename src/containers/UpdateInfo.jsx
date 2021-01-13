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
import changeUpdateStatus from '../actions/changeUpdateStatus';
import Modal from '../components/Modal';
import placeholder from '../assets/avatar.jpg';

class UpdateInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInputMode: '',
      cropButton: 'disabled',
      croppedImage: null,
			showModal: false,
			cropperOpen: false
    }

    this.handleCrop = this.handleCrop.bind(this);
    this.setState = this.setState.bind(this);
	}
	
	cropperToggle() {
		this.setState((state) => ({
			cropperOpen: !state.cropperOpen
		}))
	}

  getFormValues() {
    const personData = {};
    const { addPerson, currentUser } = this.props;
		personData.firstName = document.getElementById('firstname').value ? document.getElementById('firstname').value : '';
		personData.avatar = this.state.croppedImage
		personData.id = currentUser.id
    // eslint-disable-next-line no-shadow
    addPerson(personData);
  }
  
  handleCrop(data) {
		this.setState({
			croppedImage: data,
			cropperOpen: false
		})
	}

	backToProfile() {
		this.props.changeUpdateStatus('')
		this.props.backToProfile()
	}

  render() {
		const { currentUser } = this.props;
		const avatar = currentUser.avatar ? currentUser.avatar : placeholder
    return (
      <>
      <form className="auth-form" id="infoForm">
				<img
					className="avatar-img"
					src={this.state.croppedImage || avatar}
					alt="user avatar"
					onClick={() => this.cropperToggle()}
				/>
        <div className="form-field form-field-label">
          <label className="form-label" htmlFor="firstName">First Name: </label>
        </div>
        <div className="form-field">
          <input
						className="form-text-input"
						type="text"
						name="firstName"
						id="firstname"
						defaultValue={currentUser.firstName}
						required
					/>
        </div>
        {/* <div className="form-field form-field-label">
          <label className="form-label" htmlFor="lastName">Last Name: </label>
        </div>
        <div className="form-field">
          <input className="form-text-input" type="text" name="lastName" id="lastname" required />
        </div> */}
        <div className="form-field">
          <input
						className="btn form-button"
						type="button"
						value="Update Info"
						onClick={() => this.getFormValues()}
					/>
        </div>
      </form>
      {!this.state.cropperOpen && this.props.updateStatus === 'success' &&
        <Modal 
          title="Nice!" 
          message="Your user profile has been updated" 
          onModalOk={() => this.backToProfile()} 
        />
      }
			{this.state.cropperOpen &&
          <Modal
            title="Crop your image"
						message=""
						cropper={avatar}
            cropperCallback={this.handleCrop}
          />
			}
      </>
    );
  }
}

UpdateInfo.propTypes = {
  addPerson: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateStatus: PropTypes.string.isRequired,
  changeUpdateStatus: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  addPerson, 
  updateAvatar,
  changeUpdateStatus 
}, dispatch);

const mapStateToProps = (state) => {
  const { currentUser, updateStatus } = state;
  return {
    currentUser,
    updateStatus
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateInfo);
