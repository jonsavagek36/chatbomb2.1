import React, { Component } from 'react';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='chat-header'>
        <div className='header-name'></div>
        <div className='header-timer'></div>
        <div className='header-buttons'></div>
      </div>
    );
  }
}

export default ChatHeader;
