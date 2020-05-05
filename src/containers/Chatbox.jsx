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
import sendMessage from '../actions/sendMessage';

class Chatbox extends Component {
  componentDidUpdate(prevProps) {
    const { friendship, getChat } = this.props;
    const friendshipId = friendship ? friendship.friendship_id : null;
    const prevFriendshipId = prevProps.friendship ? prevProps.friendship.friendship_id : null;
    if (friendshipId && prevFriendshipId !== friendshipId) {
      getChat(friendshipId);
    }
  }

  handleChatSubmit(inputValue, chatMessages) {
    const { currentUser, friendship, sendMessage } = this.props;
    const input = document.getElementById('userinput');
    if (input.value) {
      const newMessage = {
        sender: currentUser.person_id,
        receiver: friendship.person_id,
        content: inputValue
      };
      input.value = '';
      sendMessage(JSON.stringify([...chatMessages, newMessage]))
    }
  }

  render() {
    const { friendship, currentUser, messages } = this.props;
    const chatMessages = messages.messages ? JSON.parse(messages.messages) : [];
    console.log('RENDERCHATMESSAGES', chatMessages)
    return (
      <div className="chatbox-container">
        <div className="chatbox-messages">
          {chatMessages.map((message, index) => {
            let type = 'system';
            let image;
            if (message.sender === currentUser.person_id) {
              type = 'outgoing';
              image = `http://friendo2.s3-website-ap-northeast-1.amazonaws.com/32x32/${currentUser.avatar_url}`;
            }
            if (message.receiver === currentUser.person_id) {
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
        <div className="chatbox-input-container">
          <textarea id="userinput" className="chatbox-chat-input" />
          <div className="chatbox-submit">
            <FaPaperPlane 
              onClick={() => this.handleChatSubmit(document.getElementById('userinput').value, chatMessages)} 
            />
          </div>
        </div>
      </div>
    );
  }
}

Chatbox.propTypes = {
  friendship: PropTypes.object,
  messages: PropTypes.object,
  getChat: PropTypes.func.isRequired,
  sendMessage : PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  getChat,
  sendMessage
 }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
