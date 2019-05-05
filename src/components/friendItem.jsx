/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../assets/avatar.jpg';

const FriendItem = props => {
  const avatarSrc =
    props.friend.avatar_url === '' || !props.friend.avatar_url
      ? placeholder
      : `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/64x64/${props.friend.avatar_url}`;
  const firstName = props.friend.first_name;
  const lastName = props.friend.last_name;
  const status = props.friend.friend_status;
  return (
    <div className="friend-item-container">
      <img className="friend-item-avatar" src={avatarSrc} alt={`${firstName}`} />
      <div className="friend-info-section">
        <h2 className="friend-item-name">{`${firstName} ${lastName}`}</h2>
        <p className="friend-status-text">{status}</p>
      </div>
    </div>
  );
};

export default FriendItem;

FriendItem.propTypes = {
  friend: PropTypes.object.isRequired
};
