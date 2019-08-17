/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Welcome = () => (
  <div>
    <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
      <div className="welcome-page">
        <h1 className="welcome-title">Welcome to Friendo!</h1>
        <h3 className="welcome-description">
          Sign up, add a photo, update your info, and find some friends using the search feature.
        </h3>
        <h3 className="welcome-description">Search "Ross" and add me to see how it works.</h3>
        <h3 className="welcome-description">New features coming soon!</h3>
      </div>
    </CSSTransition>
  </div>
);

export default Welcome;
