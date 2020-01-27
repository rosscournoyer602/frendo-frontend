/* eslint-disable react/no-array-index-key */
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
import ChatBubble from '../components/ChatBubble';

class Chatbox extends Component {
  componentDidUpdate(prevProps) {
    const { friendship, getChat } = this.props;
    const friendshipId = friendship ? friendship.friendship_id : null;
    const prevFriendshipId = prevProps.friendship ? prevProps.friendship.friendship_id : null;
    if (friendshipId && prevFriendshipId !== friendshipId) {
      getChat(friendshipId);
    }
  }

  render() {
    const { messages, userId } = this.props;
    const chatMessages = messages.messages ? JSON.parse(messages.messages) : [];
    return (
      <div className="chatbox-container">
        <div className="chatbox-messages">
          {chatMessages.map((message, index) => {
            let type = 'system';
            if (message.sender === userId) type = 'outgoing';
            if (message.receiver === userId) type = 'incoming';
            return (
              <ChatBubble
                key={`${message.content}${index}`}
                content={message.content}
                type={type}
              />
            );
          })}
        </div>
        <textarea className="chatbox-chat-input" />
      </div>
    );
  }
}

Chatbox.propTypes = {
  friendship: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  getChat: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ getChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
