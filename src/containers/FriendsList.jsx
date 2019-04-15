/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getFriends from '../actions/getFriends';

class FriendsList extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Friends</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends
});

const mapDispatchToProps = dispatch => bindActionCreators({ getFriends }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
