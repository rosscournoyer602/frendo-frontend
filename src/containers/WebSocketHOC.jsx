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
			withCredentials: true
		});
	}
	
	componentDidMount() {
		this.socket.on('connect', () => {
			console.log('CLIENTCONNECT')
			this.socket.emit('message', 'Hello Server!')
		})
		this.socket.on('message', (args) => {
			console.log('MESSAGE', args)
		})
	}

  componentDidUpdate() {
    const { messages, updateChat } = this.props;
    if (!this.friendShipId && messages.friendship_id) {
      this.friendShipId = messages.friendship_id;
      this.socket.on(`message${this.friendShipId}`, message => {
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