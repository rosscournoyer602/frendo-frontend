/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../assets/avatar.jpg';

const ProfileDisplay = props => {
	const { currentUser } = props;
  const avatarSrc =
    currentUser.avatar === '' || !currentUser.avatar
      ? placeholder
      : `https://d24tnhvewxeba9.cloudfront.net/${currentUser.avatar}`;

  return (
    <div className="profile-display">
      <img className="avatar-img" src={avatarSrc} alt="user avatar" />
      {currentUser.firstName && (
        <>
          <h3 className="profile-field">{currentUser.firstName}</h3>
        </>
      )}
      {!currentUser.firstName && <h3 className="profile-field">Update your information!</h3>}
    </div>
  );
};

ProfileDisplay.propTypes = {
  currentUser: PropTypes.any.isRequired
};

export default ProfileDisplay;
