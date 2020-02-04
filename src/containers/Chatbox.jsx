/* eslint-disable react/require-default-props */
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
import { FaPaperPlane } from 'react-icons/fa';
import getChat from '../actions/getChat';
import ChatBubble from '../components/ChatBubble';

class Chatbox extends Component {
  componentDidUpdate(prevProps) {
    const { friendship, getChat, messages } = this.props;
    const friendshipId = friendship ? friendship.friendship_id : null;
    const prevFriendshipId = prevProps.friendship ? prevProps.friendship.friendship_id : null;
    if (!prevFriendshipId) {
      getChat(friendshipId);
    }
    if (friendshipId && prevFriendshipId !== friendshipId) {
      getChat(friendshipId);
    }
    if (!messages.messages) {
      getChat(friendshipId);
    }
  }

  render() {
    const { friendship, currentUser, messages, userId } = this.props;
    const chatMessages = messages.messages ? JSON.parse(messages.messages) : [];
    return (
      <div className="chatbox-container">
        <div className="chatbox-messages">
          {chatMessages.map((message, index) => {
            let type = 'system';
            let image;
            if (message.sender === userId) {
              type = 'outgoing';
              image = `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/32x32/${currentUser.avatar_url}`;
            }
            if (message.receiver === userId) {
              type = 'incoming';
              image = `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/32x32/${friendship.avatar_url}`;
            }
            return (
              <ChatBubble
                key={`${message.content}${index}`}
                image={image}
                content={message.content}
                type={type}
              />
            );
          })}
        </div>
        <textarea className="chatbox-chat-input" />
        <FaPaperPlane />
      </div>
    );
  }
}

Chatbox.propTypes = {
  friendship: PropTypes.object,
  messages: PropTypes.object,
  getChat: PropTypes.func.isRequired,
  userId: PropTypes.number,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ getChat }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
