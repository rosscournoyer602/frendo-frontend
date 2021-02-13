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
    this.socket = io(process.env.REACT_APP_API_URL, {
			// path: '/',
			// withCredentials: true
		});

		this.socketReady = false
	}

	componentDidMount() {
		this.socket.on('connect', () => {
			this.socket.emit('message', 'Hello Server!')
			this.socket.on('message', (message) => {
				console.log(message)
			})
		})
	}

  componentDidUpdate() {
		const { updateChat, friend } = this.props;
		if (friend && friend.id && !this.socketReady) {
			this.friendShipId = friend.id
			this.socketReady = true
			this.socket.on(`message${this.friendShipId}`, (messages) => {
				updateChat({id: messages.id, messages: JSON.parse(messages.messages)})
			})
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