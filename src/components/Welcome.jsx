import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Welcome = () => (
  <div>
    <CSSTransition in appear timeout={500} classNames="fade" unmountOnExit>
      <h1 className="page-title">Welcome</h1>
    </CSSTransition>
  </div>
);

export default Welcome;
