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
  componentDidUpdate(nextProps) {
    const { currentUser, getPerson } = this.props;
    if (currentUser && !currentUser.first_name) {
      getPerson(currentUser.email);
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
