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
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
		const { messages, friendship } = this.props;
		console.log('FRIENDSHIP', friendship)
    if (messages && messages.messages) {
      const newMessages = JSON.parse(messages.messages);
      this.setState({
        messages: newMessages
      });
    }
    this.updateScroll();
  }

  componentDidUpdate(prevProps) {
    const { friendship, getChat, messages } = this.props;
    const friendshipId = friendship ? friendship.id : null;
    const prevFriendshipId = prevProps.friendship ? prevProps.friendship.id : null;
    this.updateScroll();
    if (friendshipId && prevFriendshipId !== friendshipId) {
      getChat(friendshipId);
    }
    if (friendshipId && Object.keys(messages).length === 0) {
      getChat(friendshipId);
    }
    if (prevProps.messages.messages !== messages.messages) {
      const newMessages = JSON.parse(messages.messages);
      this.setState({
        messages: newMessages
      });
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
      sendMessage({
        friendship: friendship.friendship_id,
        messages: JSON.stringify([...chatMessages, newMessage])
      });
    }
  }

  updateScroll() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
      e.preventDefault();
      const { messages } = this.props;
      const input = document.getElementById('userinput').value;
      const parsedMessages = JSON.parse(messages.messages)
      this.handleChatSubmit(input, parsedMessages);
    }
  }

  render() {
    const { friendship, currentUser } = this.props;
    const { messages } = this.state;
    return (
      <div className="chatbox-container">
        <div id="chat" className="chatbox-messages">
          {messages.map((message, index) => {
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
          <textarea id="userinput" className="chatbox-chat-input" placeholder="Send a message" onKeyDown={(e) => this.handleKeyDown(e)} />
          <div className="chatbox-submit">
            <FaPaperPlane 
              onClick={() => this.handleChatSubmit(document.getElementById('userinput').value, messages)} 
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
  sendMessage,
 }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
