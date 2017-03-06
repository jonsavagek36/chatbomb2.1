import React, { Component } from 'react';

export default class ChatBody extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let messages = null;
    if (this.props.selected_friend && this.props.conversations[this.props.selected_friend.id]) {
      messages = this.props.conversations[this.props.selected_friend.id].map((message, idx) => {
        return <li key={idx}>{message.sender.screen_name}: {message.message}</li>;
      });
    }
    return (
      <div className='chat-box'>
        <div className='chat-messages'>
          <ul className='no-bullets' id='chat-ul'>
            {messages}
          </ul>
        </div>
      </div>
    );
  }
}
