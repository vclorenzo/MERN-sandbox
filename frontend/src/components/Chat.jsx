import React from 'react';
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';
import CustomHeader from './CustomHeader';
import StandardMessageForm from './customMessageForms/StandardMessageForm';

const Chat = () => {
  console.log();

  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
    'testuser',
    '1234'
  );
  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <CustomHeader chat={chat} />}
        renderMessageForm={(props) => {
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
