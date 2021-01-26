/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import placeholder from '../assets/avatar.jpg';
import getFriends from '../actions/getFriends';
import getPerson from '../actions/getPerson';
import WebSocketHOC from './WebSocketHOC';
import Chatbox from './Chatbox';

class FriendDisplay extends Component {
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
    if (currentUser.id !== prevProps.currentUser.id) {
      getFriends(currentUser.id);
    }
  }

  render() {
    const { location, friends, currentUser } = this.props;
		const displayedFriendId = location.pathname.split('/')[2];
    const friendData = friends.filter(
      friend => friend.personOne.id === parseInt(displayedFriendId, 10) || friend.personTwo.id === parseInt(displayedFriendId, 10)
		);
		let friend
		if (friendData[0]) {
			friend = friendData[0]
			if (friend.personOne && friend.personOne.id === currentUser.id) {
				friend.friendField = 'personTwo'
			}
			if (friend.personTwo && friend.personTwo.id === currentUser.id) {
				friend.friendField = 'personOne'
			}
		}
		console.log('FRIEND', friend)
    const avatarSrc =
			!friend || !friend[friend.friendField].avatar
			? placeholder
			: `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/100x100/${friend[friend.friendField].avatar}`;

    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="friend-page">
          <WebSocketHOC userID={currentUser.id} friendID={displayedFriendId} friend={friend}>
            <div className="friend-display">
              <img className="friend-avatar-img" src={avatarSrc} alt="user avatar" />
              {friend && friend.firstName && (
                <h3 className="friend-field">
                  {`${friend.firstName}`}
                </h3>
              )}
              {/* {!friendData[0] ||
							(!friendData[0].first_name && (
								<h3 className="friend-field">Update your information!</h3>
							))} */}
            </div>
            <Chatbox friendship={friend} />
          </WebSocketHOC>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({ getFriends, getPerson }, dispatch);

FriendDisplay.propTypes = {
  friends: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getFriends: PropTypes.func.isRequired,
  getPerson: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FriendDisplay)
);
