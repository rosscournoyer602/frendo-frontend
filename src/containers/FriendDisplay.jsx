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
import WebSocketHOC from '../components/WebSocketHOC';
import Chatbox from './Chatbox';

class FriendDisplay extends Component {
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

  render() {
    const { location, friends, currentUser } = this.props;
    const displayedFriendId = location.pathname.split('/')[2];
    const friendData = friends.filter(
      friend => friend.person_id === parseInt(displayedFriendId, 10)
    );
    const friendshipId = friendData[0] ? friendData[0].friendship_id : null;
    const avatarSrc =
      !friendData[0] || friendData[0].avatar_url === '' || !friendData[0].avatar_url
        ? placeholder
        : `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/200x200/${friendData[0].avatar_url}`;
    return (
      <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
        <div className="profile-page">
          <WebSocketHOC userID={currentUser.person_id} friendID={displayedFriendId}>
            <div className="profile-display">
              <img className="avatar-img" src={avatarSrc} alt="user avatar" />
              {friendData[0] && friendData[0].first_name && (
                <>
                  <h3 className="profile-field">
                    {`${friendData[0].first_name} ${friendData[0].last_name}`}
                  </h3>
                  <h3 className="profile-field">{friendData[0].street_address}</h3>
                  <h3 className="profile-field">
                    {`${friendData[0].city}, ${friendData[0].state_province}`}
                  </h3>
                  <h3 className="profile-field">{friendData[0].phone}</h3>
                </>
              )}
              {!friendData[0] ||
                (!friendData[0].first_name && (
                  <h3 className="profile-field">Update your information!</h3>
                ))}
            </div>
            <Chatbox friendshipId={friendshipId} userId={currentUser.person_id} />
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
