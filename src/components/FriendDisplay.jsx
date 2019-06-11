/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../assets/avatar.jpg';

const FriendDisplay = props => {
  const { friendData } = props;
  const avatarSrc =
    !friendData || friendData.avatar_url === '' || !friendData.avatar_url
      ? placeholder
      : `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/200x200/${friendData.avatar_url}`;
  return (
    <div className="profile-display">
      <img className="avatar-img" src={avatarSrc} alt="user avatar" />
      {friendData && friendData.first_name && (
        <>
          <h3 className="profile-field">{`${friendData.first_name} ${friendData.last_name}`}</h3>
          <h3 className="profile-field">{friendData.street_address}</h3>
          <h3 className="profile-field">{`${friendData.city}, ${friendData.state_province}`}</h3>
          <h3 className="profile-field">{friendData.phone}</h3>
        </>
      )}
      {/* <h3 className="profile-field">{friendData.email}</h3> */}
      {!friendData ||
        (!friendData.first_name && <h3 className="profile-field">Update your information!</h3>)}
    </div>
  );
};

FriendDisplay.propTypes = {
  friendData: PropTypes.any.isRequired
};

export default FriendDisplay;
