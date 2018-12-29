/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import unauthUser from '../actions/unauthUser';

class Header extends Component {
  render() {
    // eslint-disable-next-line no-shadow
    const { authStatus, unauthUser } = this.props;
    return (
      <div className="header">
        <ul className="header-ul">
          <Link className="link" to="/">
            <li className="header-li logo">Friendo</li>
          </Link>
          {!authStatus && (
            <>
              <Link className="link" to="/signup">
                <li className="header-li desktop">Sign Up</li>
              </Link>
              <Link className="link" to="/signin">
                <li className="header-li desktop">Sign In</li>
              </Link>
            </>
          )}
          {authStatus && (
            <>
              <Link className="link" to="/">
                <li className="header-li desktop" onClick={() => unauthUser()}>
                  My Profile
                </li>
              </Link>
              <Link className="link" to="/">
                <li className="header-li desktop" onClick={() => unauthUser()}>
                  My Friends
                </li>
              </Link>
              <Link className="link" to="/">
                <li className="header-li desktop" onClick={() => unauthUser()}>
                  Sign Out
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  unauthUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { authStatus } = state;
  return {
    authStatus
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ unauthUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
