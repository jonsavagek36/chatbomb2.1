import React, { Component } from 'react';

class LiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='live-chat'>
        {this.props.live_chat}
      </div>
    );
  }
}

export default LiveChat;
