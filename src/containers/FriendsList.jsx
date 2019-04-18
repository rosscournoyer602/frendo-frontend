/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getFriends from '../actions/getFriends';
import getPerson from '../actions/getPerson';

class FriendsList extends Component {
  componentDidMount() {
    const { currentUser, getPerson, getFriends } = this.props;
    if (currentUser.email && !currentUser.person_id) {
      getPerson(currentUser.email);
    }
    if (!currentUser.email && window.localStorage.getItem('user')) {
      getPerson(window.localStorage.getItem('user'));
    }
    if (currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  componentDidUpdate() {
    const { currentUser, getFriends } = this.props;
    if (currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Friends</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  friends: state.friends
});

const mapDispatchToProps = dispatch => bindActionCreators({ getFriends, getPerson }, dispatch);

FriendsList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getFriends: PropTypes.func.isRequired,
  getPerson: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
