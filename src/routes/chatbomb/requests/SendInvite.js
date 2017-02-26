import React, { Component } from 'react';

class SendInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='send-invite'>
        <div className='form-title'>Invite a friend!</div>
        <div className='form-box'>
          <div className='form-row'>
            <div className='form-label'>Friend E-Mail: </div>
            <div className='form-input'><input type='text' id='invite-email' /></div>
          </div>
          <div className='form-buttons'>
            <div className='signup-btn'><button onClick={this.props.sendInvite}>Send Invite</button></div>
          </div>
          <div className='form-message' id='invite-message'></div>
        </div>
      </div>
    );
  }
}

export default SendInvite;
