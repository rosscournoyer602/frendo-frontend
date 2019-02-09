/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ProfileDisplay = props => {
  const { currentUser } = props;
  return (
    <div className="profile-display">
      {currentUser.first_name && (
        <>
          <h3 className="profile-field">{`${currentUser.first_name} ${currentUser.last_name}`}</h3>
          <h3 className="profile-field">{currentUser.street_address}</h3>
          <h3 className="profile-field">{`${currentUser.city}, ${currentUser.state_province}`}</h3>
          <h3 className="profile-field">{currentUser.phone}</h3>
        </>
      )}
      <h3 className="profile-field">{currentUser.email}</h3>
      {!currentUser.first_name && <h3 className="profile-field">Update your information!</h3>}
    </div>
  );
};

ProfileDisplay.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default ProfileDisplay;
