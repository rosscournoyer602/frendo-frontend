import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const { authStatus } = this.props;
      if (!authStatus) {
        browserHistory.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authStatus) {
        browserHistory.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authStatus: state.authStatus };
  }
  Authentication.propTypes = {
    authStatus: PropTypes.bool.isRequired
  };

  return connect(mapStateToProps)(Authentication);
}
