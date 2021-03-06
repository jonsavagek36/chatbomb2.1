import React from 'react';

const SendRequests = (props) => {
  return (
    <div className='request-send'>
      <div className='form-title'>Send Request</div>
      <div className='form-box'>
        <div className='form-row'>
          <div className='form-label'>By E-Mail: </div>
          <div className='form-input'><input type='text' id='request-email' /></div>
        </div>
        <div className='form-message' id='req-email-message'></div>
        <div className='form-row'>
          <div className='form-label'>By Screen Name: </div>
          <div className='form-input'><input type='text' id='request-name' /></div>
        </div>
        <div className='form-message' id='req-name-message'></div>
        <div className='form-buttons'>
          <div className='signup-btn'><button onClick={props.sendRequest}>Send Request</button></div>
        </div>
        <div className='form-message' id='req-message'></div>
      </div>
    </div>
  );
}

export default SendRequests;
