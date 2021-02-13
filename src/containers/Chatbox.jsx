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
		const { friendship, getChat } = this.props
		if (friendship) {
			getChat(friendship.id);
		}
	}

  componentDidUpdate(prevProps) {
		const { friendship, getChat, messages } = this.props;
    const friendshipId = friendship ? friendship.id : null;
    const prevFriendshipId = prevProps.friendship ? prevProps.friendship.id : null;
    this.updateScroll();
    if (friendshipId && prevFriendshipId !== friendshipId) {
      getChat(friendshipId);
    }
    if (prevProps.messages.messages !== messages.messages) {
			this.setState({
				messages: messages.messages
			})
    }
  }

  handleChatSubmit(inputValue, chatMessages) {
		const { currentUser, friendship, sendMessage } = this.props;
		if (!chatMessages) return
		const input = document.getElementById('userinput');

    if (input.value) {
      const newMessage = {
        sender: currentUser.id,
        content: inputValue
      };
      input.value = '';
      sendMessage({
				id: chatMessages.id,
				messages: JSON.stringify([...chatMessages.messages, newMessage]),
				friendshipId: friendship.id
			});
    }
  }

  updateScroll() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {  //checks whether the pressed key is "Enter"
      e.preventDefault();
      const { messages } = this.props;
      const input = document.getElementById('userinput').value;
      this.handleChatSubmit(input, messages);
    }
  }

  render() {
    const { friendship, currentUser } = this.props;
		const { messages } = this.state;
    return (
      <div className="chatbox-container">
        <div id="chat" className="chatbox-messages">
          {messages.length > 0 && messages.map((message, index) => {
            let type = 'system';
            let image;
            if (message.sender === currentUser.id) {
              type = 'outgoing';
              image = `https://d24tnhvewxeba9.cloudfront.net/${currentUser.avatar}`;
            }
            if (message.sender === friendship[friendship.friendField].id) {
              type = 'incoming';
              image = `https://d24tnhvewxeba9.cloudfront.net/${friendship[friendship.friendField].avatar}`;
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
  messages: PropTypes.any,
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
