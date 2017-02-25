import React, { Component } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import LiveChat from './LiveChat';
import ChatSend from './ChatSend';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='chat-box'>
        <ChatHeader />
        <ChatBody />
        <LiveChat />
        <ChatSend />
      </div>
    );
  }
}

export default Chat;
