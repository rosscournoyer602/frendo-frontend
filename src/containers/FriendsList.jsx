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
		if (currentUser.id) {
			getFriends(currentUser.id)
		} else {
			const id = localStorage.getItem('user')
			getPerson(id)
		}
  }

  componentDidUpdate(prevProps) {
		const { currentUser, getFriends } = this.props;
		if (prevProps.currentUser.id !== currentUser.id) {
			getFriends(currentUser.id)
		}
  }

  parseList(list) {
		const { currentUser } = this.props;
    list.forEach(item => {
			// tag objects to identify which one is the 'friend'
			if (item.personOne && item.personOne.id === currentUser.id) {
				item.friendField = 'personTwo'
			}
			if (item.personTwo && item.personTwo.id === currentUser.id) {
				item.friendField = 'personOne'
			}
      switch (item.status) {
        case 2:
          this.friends.push(item);
          break;
        case 1:
          if (item.actionTaker === currentUser.id) {
            this.waitingForAccept.push(item);
          } else {
            this.incomingAccept.push(item);
          }
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
                <li key={friend.id}>
                  {friend.status === 2 && (
                    <Link to={`/friend/${friend[friend.friendField].id}`}>
                      <FriendItem friend={friend[friend.friendField]} actionType="friend" actionTaker={currentUser.id} friendship={friend} />
                    </Link>
                  )}
                  {friend.friend_status === 1 && <FriendItem friend={friend} />}
                </li>
              ))}
            </ul>
          )}
          {this.waitingForAccept.length > 0 && (
            <>
              <h2 className="friends-list-header">Waiting for them to accept</h2>
              <ul>
                {this.waitingForAccept.map(friend => (
                  <li key={friend.id}>
                    <FriendItem friend={friend[friend.friendField]} actionType="waitingForAccept" actionTaker={currentUser.id} friendship={friend} />
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
                    <FriendItem friend={friend[friend.friendField]} actionType="incomingRequest" actionTaker={currentUser.id} friendship={friend} />
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
