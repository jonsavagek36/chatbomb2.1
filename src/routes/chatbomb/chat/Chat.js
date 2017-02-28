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
    let conversation = this.props.conversations[this.props.selected_friend.id];
    return (
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'></div>
        </div>
        <div className='chat-body'>
          <ChatHeader selected_friend={this.props.selected_friend} />
          <ChatBody conversation={conversation} />
          <LiveChat live_chat={this.props.live_chat} />
          <ChatSend sendMessage={this.props.sendMessage} />
        </div>
      </div>
    );
  }
}

export default Chat;
