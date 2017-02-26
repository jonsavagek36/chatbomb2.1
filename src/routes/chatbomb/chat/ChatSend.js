import React, { Component } from 'react';

class ChatSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='chat-send'>
        <div className='send-box'><input type='text' id='send-box' /></div>
        <div className='send-btn'><input type='submit' value='Send' /></div>
      </div>
    );
  }
}

export default ChatSend;
