import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export default class WebSocketHOC extends Component {
  componentDidMount() {
    const socket = io('http://localhost:8080');
    socket.on('connect', () => {
      socket.emit('message', 'Hey server!');
    });
    socket.on('message', message => {
      console.log(message);
    });
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

WebSocketHOC.propTypes = {
  children: PropTypes.node.isRequired
};
