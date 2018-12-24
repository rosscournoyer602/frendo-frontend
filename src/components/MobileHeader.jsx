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

class MobileHeader extends Component {
  render() {
    // eslint-disable-next-line no-shadow
    const { authStatus, unauthUser } = this.props;
    return (
      <div className="header">
        <ul className="header-ul">
          <Menu right width="30%">
            {!authStatus && (
              <>
                <Link className="link" to="/signup">
                  <li className="mobile-header-li">Sign Up</li>
                </Link>
                <Link className="link" to="/signin">
                  <li className="mobile-header-li">Sign In</li>
                </Link>
              </>
            )}
            {authStatus && (
              <Link className="link" to="/">
                <li className="mobile-header-li" onClick={() => unauthUser()}>
                  Sign Out
                </li>
              </Link>
            )}
          </Menu>
        </ul>
      </div>
    );
  }
}

MobileHeader.propTypes = {
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
)(MobileHeader);
