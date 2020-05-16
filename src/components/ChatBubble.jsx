import React from 'react';
import PropTypes from 'prop-types';

const ChatBubble = props => {
  const { content, type, image } = props;
  return (
    <div className={`chatbox-chat-block-${type}`}>
      
      {type === 'incoming' && <img className="chatbox-chat-avatar" src={image} alt="useravatar" />}
      <div className={`chatbox-chat-bubble ${type}`}>
        <p className="chatbox-chat-content">{content}</p>
      </div>
      {type === 'outgoing' && <img className="chatbox-chat-avatar" src={image} alt="useravatar" />}
    </div>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ChatBubble;
