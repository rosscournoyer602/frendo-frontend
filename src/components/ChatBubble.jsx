import React from 'react';
import PropTypes from 'prop-types';

const ChatBubble = props => {
  const { content, type } = props;
  console.log('TYPE', type);
  return (
    <div className={`chat-bubble ${type}`}>
      <p>{content}</p>
    </div>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ChatBubble;
