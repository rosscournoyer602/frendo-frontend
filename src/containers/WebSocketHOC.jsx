import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import updateChat from '../actions/updateChat';

class WebSocketHOC extends Component {
  constructor(props) {
    super(props);

    this.friendShipId = null;
    this.socket = io(process.env.API_URL);
  }

  componentDidUpdate() {
    const { messages, updateChat } = this.props;
    if (!this.friendShipId && messages.friendship_id) {
      this.friendShipId = messages.friendship_id;
      console.log('SOCKET LISTENING FOR',`message${this.friendShipId}`);
      this.socket.on(`message${this.friendShipId}`, message => {
        console.log('CLIENT RECEIVED', message);
        updateChat(message);
      });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

WebSocketHOC.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocketHOC);