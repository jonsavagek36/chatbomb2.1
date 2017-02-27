import React, { Component } from 'react';

class Nameplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='name-plate' onClick={this.props.selectFriend}>
          <div className='friend-avatar'>
          </div>
          <div className='friend-email'>
          </div>
          <div className='friend-name'>
          </div>
          <div className='new-message'>
          </div>
        </div>
      </div>
    );
  }
}

export default Nameplate;
