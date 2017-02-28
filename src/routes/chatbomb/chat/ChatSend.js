import React, { Component } from 'react';

class ChatSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class='chat-send'>
        <div class='send-input'><input type='text' id='send-text' /></div>
        <div class='send-button'><input type='submit' value='Send' /></div>
      </div>
    );
  }
}

export default ChatSend;
