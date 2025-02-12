import React from 'react';

const ChatBubble = ({ message }) => {
  return (
    <div className={`chat-bubble ${message.type}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatBubble;
