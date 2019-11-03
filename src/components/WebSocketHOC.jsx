import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WebSocketHOC extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    const ws = new WebSocket('ws://localhost:8080');
    // get chat history

    ws.onopen = () => {
      console.log('connected');
      ws.send('Hello Server, I am the Client!');
    };

    ws.onmessage = e => {
      const message = e.data;
      console.log(message);
    };

    ws.onclose = () => {
      console.log('disconnected');
    };
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

WebSocketHOC.propTypes = {
  children: PropTypes.node.isRequired
  // userID: PropTypes.number.isRequired,
  // friendID: PropTypes.number.isRequired
};
