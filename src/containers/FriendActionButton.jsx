/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FriendActionButton extends Component {
  render() {
    const { friends, friend } = this.props;
    console.log('personid:', friend.person_id);
    friends.forEach((f, index) => {
      console.log(index, f.person_id === friend.person_id);
    });
    console.log('FILTERED', friends.filter(f => f.person_id === friend.person_id));
    return (
      <button type="button" className="btn friend-action-btn">
        Action
      </button>
    );
  }
}

FriendActionButton.propTypes = {
  friend: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  friends: state.friends
});

// const mapDispatchToProps = dispatch => bindActionCreators({ searchUsers }, dispatch);

export default connect(
  mapStateToProps,
  null
)(FriendActionButton);
