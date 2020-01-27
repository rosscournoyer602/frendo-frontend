import React from 'react';
import PropTypes from 'prop-types';

const ChatBubble = props => {
  const { content, type } = props;
  return (
    <div className={`chat-block ${type}`}>
      <div className={`chatbox-chat-bubble ${type}`}>
        {/* <img src='http://friendo2.s3-website-ap-northeast-1.amazonaws.com/64x64/'></img> */}
        <p>{content}</p>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ChatBubble;
