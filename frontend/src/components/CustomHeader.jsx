import React from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaPhoneAlt } from 'react-icons/fa';

const CustomHeader = ({ chat }) => {
  // console.log('🚀 ~ CustomHeader ~ chat:', chat);
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <HiChatBubbleLeftRight className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <FaPhoneAlt className="icon-phone" />
        <h3 className="header-text">{chat.description}</h3>
      </div>
    </div>
  );
};

export default CustomHeader;
