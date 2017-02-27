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
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'></div>
        </div>
        <div className='chat-body'>
          <ChatHeader />
          <ChatBody />
          <LiveChat />
          <ChatSend />
        </div>
      </div>
    );
  }
}

export default Chat;
