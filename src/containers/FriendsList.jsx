/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import getFriends from '../actions/getFriends';
import getPerson from '../actions/getPerson';
import FriendItem from '../components/FriendItem';

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.waitingForAccept = [];
    this.incomingAccept = [];
    this.friends = [];
  }

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

  componentDidUpdate(prevProps) {
    const { currentUser, getFriends } = this.props;
    if (currentUser.person_id !== prevProps.currentUser.person_id) {
      getFriends(currentUser.person_id);
    }
  }

  parseList(list) {
    list.forEach(item => {
      switch (item.friend_status) {
        case 'friends':
          this.friends.push(item);
          break;
        case 'pending_first_second':
          this.waitingForAccept.push(item);
          break;
        case 'pending_second_first':
          this.incomingAccept.push(item);
          break;
        default:
          break;
      }
    });
  }

  render() {
    const { friends, currentUser } = this.props;
    this.waitingForAccept = [];
    this.incomingAccept = [];
    this.friends = [];
    this.parseList(friends);
    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="friends-list">
          <h2 className="friends-list-header">Friends List</h2>
          {this.friends.length > 0 && (
            <ul>
              {this.friends.map(friend => (
                <li key={friend.person_id}>
                  <Link to={`/friend/${friend.person_id}`}>
                    <FriendItem friend={friend} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {this.waitingForAccept.length > 0 && (
            <>
              <h2 className="friends-list-header">Waiting for them to accept</h2>
              <ul>
                {this.waitingForAccept.map(friend => (
                  <li key={friend.person_id}>
                    <Link to={`/friend/${currentUser.person_id}`}>
                      <FriendItem friend={friend} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {this.incomingAccept.length > 0 && (
            <>
              <h2 className="friends-list-header">Waiting for you to accept</h2>
              <ul>
                {this.incomingAccept.map(friend => (
                  <li key={friend.person_id}>
                    <Link to={`/friend/${currentUser.person_id}`}>
                      <FriendItem friend={friend} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CSSTransition>
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
  friends: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsList);
