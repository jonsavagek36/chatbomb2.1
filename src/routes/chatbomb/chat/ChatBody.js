import React, { Component } from 'react';

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='chat-box'>
        <div className='chat-messages'>
        </div>
      </div>
    );
  }
}

export default ChatBody;
