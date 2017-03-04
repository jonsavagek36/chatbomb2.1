import React, { Component } from 'react';

class Nameplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='name-plate' onClick={this.props.selectFriend}>
        <div className='friend-avatar'>
        </div>
        <div className='friend-email'>
          {this.props.friend.email}
        </div>
        <div className='friend-name'>
          {this.props.friend.screen_name}
        </div>
        <div className='new-message'>
        </div>
      </div>
    );
  }
}

export default Nameplate;
