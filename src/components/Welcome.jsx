/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Welcome = () => (
  <div>
    <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
      <div className="welcome-page">
        <h1 className="welcome-page__title">Welcome to Friendo</h1>
        <div className="welcome-page__intro-container">
          <p className="welcome-page__intro-text">You can create a profile, add a picture,</p>
          <p className="welcome-page__intro-text">find people you know, and connect!</p>
          <p className="welcome-page__intro-text">Sign in or Sign up to get started.</p>
        </div>
      </div>
    </CSSTransition>
  </div>
);

export default Welcome;
