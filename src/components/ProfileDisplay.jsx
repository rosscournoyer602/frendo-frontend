/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../assets/avatar.jpg';

const ProfileDisplay = props => {
  const { currentUser } = props;
  const avatarSrc =
    currentUser.avatar_url === '' || !currentUser.avatar_url
      ? placeholder
      : `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/250x250/${currentUser.avatar_url}`;
  return (
    <div className="profile-display">
      <img src={avatarSrc} alt="user avatar" />
      {currentUser.first_name && (
        <>
          <h3 className="profile-field">{`${currentUser.first_name} ${currentUser.last_name}`}</h3>
          <h3 className="profile-field">{currentUser.street_address}</h3>
          <h3 className="profile-field">{`${currentUser.city}, ${currentUser.state_province}`}</h3>
          <h3 className="profile-field">{currentUser.phone}</h3>
        </>
      )}
      <h3 className="profile-field">{currentUser.email || currentUser}</h3>
      {!currentUser.first_name && <h3 className="profile-field">Update your information!</h3>}
    </div>
  );
};

ProfileDisplay.propTypes = {
  currentUser: PropTypes.any.isRequired
};

export default ProfileDisplay;
