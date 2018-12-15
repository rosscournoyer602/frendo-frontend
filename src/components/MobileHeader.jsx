import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

class MobileHeader extends Component {
  // showSettings (event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <div className="header">
        <ul className="header-ul">
          <Menu right width={ '30%' }>
            <Link to="/signup"><li className="mobile-header-li">Sign Up</li></Link>
            <Link to="/signin"><li className="mobile-header-li">Sign In</li></Link>
          </Menu>
        </ul>
      </div>
    );
  }
}

export default MobileHeader;