import React from 'react';

const SendInvite = (props) => {
  return (
    <div className='send-invite'>
      <div className='form-title'>Invite a friend!</div>
      <div className='form-box'>
        <div className='form-label'>Friend E-Mail: </div>
        <div className='form-input'><input type='text' id='invite-email' /></div>
      </div>
      <div className='form-buttons'>
        <div className='signup-btn'><button onClick={props.sendInvite}>Send Invite</button></div>
      </div>
      <div className='form-message' id='invite-message'></div>
    </div>
  );
}

export default SendInvite;
