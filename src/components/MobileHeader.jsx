/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import unauthUser from '../actions/unauthUser';
import updateUser from '../actions/updateUser';

class MobileHeader extends Component {
  toggleMenu() {
    if (this.menu.state.isOpen === true) {
      setTimeout(() => {
        this.menu.setState({
          isOpen: false
        });
      }, 100);
    }
  }

  handleUnauth() {
    const { unauthUser, updateUser } = this.props;
    unauthUser();
    updateUser({});
  }

  render() {
    const { authStatus } = this.props;
    return (
      <div className="header mobile-header">
        <ul className="header-ul">
          <Menu
            right
            width="30%"
            ref={el => {
              this.menu = el;
            }}
          >
            {!authStatus && (
              <>
                <Link className="link" to="/signup" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li">Sign Up</li>
                </Link>
                <Link className="link" to="/signin" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li">Sign In</li>
                </Link>
              </>
            )}
            {authStatus && (
              <>
                <Link className="link" to="/" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li">My Profile</li>
                </Link>
                <Link className="link" to="/friends" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li">My Friends</li>
                </Link>
                <Link className="link" to="/search" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li">Search</li>
                </Link>
                <Link className="link" to="/" onClick={() => this.toggleMenu()}>
                  <li className="mobile-header-li" onClick={() => this.handleUnauth()}>
                    Sign Out
                  </li>
                </Link>
              </>
            )}
          </Menu>
        </ul>
      </div>
    );
  }
}

MobileHeader.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  unauthUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ unauthUser, updateUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
