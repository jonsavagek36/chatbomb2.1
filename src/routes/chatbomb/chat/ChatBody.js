import React, { Component } from 'react';

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let messages = this.props.conversation.map((message, idx) => {
      return <li key={idx}>{message.sender}: {message.message}</li>;
    });
    return (
      <div className='chat-box'>
        <div className='chat-messages'>
          <ul className='no-bullets'>
            {messages}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatBody;
