import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from '../Routes';

class Main extends Component {
  render() {
    return (
      <div className="main-section">
        <Routes />
      </div>
    );
  }
}

export default withRouter(Main);
