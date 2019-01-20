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
  componentDidMount() {
    console.log('CDM GOT CALLED');
    const { currentUser, getPerson } = this.props;
    if (currentUser.email) {
      getPerson(currentUser.email);
    }
    if (!currentUser.email && window.localStorage.getItem('user')) {
      getPerson(window.localStorage.getItem('user'));
    }
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Profile</h1>
        <UpdateInfo />
      </div>
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
