/* eslint-disable camelcase */
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
    console.log('CDM');
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

  componentDidUpdate(prevProps) {
    const { currentUser, getFriends } = this.props;
    if (currentUser.person_id !== prevProps.currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  parseFriendList() {
    const { friends, currentUser } = this.props;
    const friendsList = [];
    friends.forEach(friend => {
      const { person_one, person_two, friend_status } = friend;
      if (friend.person_one === currentUser.person_id) {
        friendsList.push({ friend: person_two, friend_status });
      }
      if (friend.person_two === currentUser.person_id)
        friendsList.push({ friend: person_one, friend_status });
    });
    return friendsList;
  }

  render() {
    const friendsList = this.parseFriendList();
    return (
      <div>
        <ul>
          {friendsList.map(friend => (
            <li key={friend}>{friend.friend}</li>
          ))}
        </ul>
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
  getPerson: PropTypes.func.isRequired,
  friends: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
