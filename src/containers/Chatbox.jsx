/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getChat from '../actions/getChat';

class Chatbox extends Component {
  componentDidUpdate(prevProps) {
    const { friendshipId, getChat } = this.props;
    if (friendshipId && prevProps.friendshipId !== friendshipId) {
      getChat(friendshipId);
    }
  }

  render() {
    const { messages } = this.props;
    return <div className="chatbox-container">{`There are ${messages.length} messages`}</div>;
  }
}

Chatbox.propTypes = {
  friendshipId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  getChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ getChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
