import React, { Component } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import LiveChat from './LiveChat';
import ChatSend from './ChatSend';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'></div>
        </div>
        <div className='chat-body'>
          <ChatHeader
            selected_friend={this.props.selected_friend}
              />
          <ChatBody
            selected_friend={this.props.selected_friend}
            conversations={this.props.conversations}
              />
          <LiveChat
            live_chat={this.props.live_chat}
              />
          <ChatSend
            sendLiveChat={this.props.sendLiveChat}
            sendMessage={this.props.sendMessage}
              />
        </div>
      </div>
    );
  }
}
