/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../assets/avatar.jpg';
import FriendActionButton from '../containers/FriendActionButton';

const FriendItem = props => {
	const { friend, actionTaker, friendship } = props;
  const avatarSrc = !friend.avatar ? placeholder :
	`https://d24tnhvewxeba9.cloudfront.net/${props.friend.avatar}`;

	const firstName = friend.firstName;
	console.log(props)
  return (
    <div className="friend-item-container">
      <img className="friend-item-avatar" src={avatarSrc} alt={`${firstName}`} />
      <div className="friend-info-section">
        <h2 className="friend-item-name">{`${firstName}`}</h2>
      </div>
      <FriendActionButton friend={friend.friend || friend} actionType={props.actionType} actionTaker={actionTaker} friendship={friendship}/>
    </div>
  );
};

export default FriendItem;

FriendItem.propTypes = {
  friend: PropTypes.object.isRequired,
	actionType: PropTypes.string,
	actionTaker: PropTypes.number
};
