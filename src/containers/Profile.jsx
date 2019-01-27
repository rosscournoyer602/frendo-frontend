/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateInfo from './UpdateInfo';
import getPerson from '../actions/getPerson';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: 'profile'
    };
  }

  componentDidMount() {
    const { currentUser, getPerson } = this.props;
    if (currentUser.email) {
      getPerson(currentUser.email);
    }
    if (!currentUser.email && window.localStorage.getItem('user')) {
      getPerson(window.localStorage.getItem('user'));
    }
  }

  toggleDisplay(displayMode) {
    this.setState({
      displayMode
    });
  }

  render() {
    const { displayMode } = this.state;
    const { currentUser } = this.props;
    return (
      <>
        <div className="profile-toggle">
          <button type="button" onClick={() => this.toggleDisplay('profile')}>
            View
          </button>
          <button type="button" onClick={() => this.toggleDisplay('update')}>
            Update
          </button>
        </div>
        {displayMode === 'profile' && (
          <div className="profile-display">
            <h3 className="profile-field">
              {`${currentUser.first_name} ${currentUser.last_name}`}
            </h3>
            {/* <h3 className="profile-field">{String(currentUser.dob).slice(0, 10)}</h3> */}
            <h3 className="profile-field">{currentUser.street_address}</h3>
            <h3 className="profile-field">
              {`${currentUser.city}, ${currentUser.state_province}`}
            </h3>
            <h3 className="profile-field">{currentUser.phone}</h3>
            <h3 className="profile-field">{currentUser.email}</h3>
          </div>
        )}
        {displayMode === 'update' && <UpdateInfo />}
      </>
    );
  }
}

Profile.propTypes = {
  getPerson: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ getPerson }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
