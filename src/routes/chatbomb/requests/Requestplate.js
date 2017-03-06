import React from 'react';

const Requestplate = (props) => {
  return (
    <div className='request-plate'>
      <div className='request-avatar'></div>
      <div className='request-info'>
        <div className='request-name'>{props.request.request_name}</div>
        <div className='request-email'>{props.request.request_email}</div>
      </div>
      <div className='accept-request'>
        <div className='accept-button'><button onClick={props.acceptRequest}>Accept Request</button></div>
      </div>
    </div>
  );
}

export default Requestplate;
