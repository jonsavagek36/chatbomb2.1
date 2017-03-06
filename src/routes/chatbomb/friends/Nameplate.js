import React from 'react';

const Nameplate = (props) => {
  return (
    <div className='name-plate' onClick={props.selectFriend}>
      <div className='friend-avatar'>
      </div>
      <div className='friend-email'>{props.friend.email}</div>
      <div className='friend-name'>{props.friend.name}</div>
      <div className='new-message'></div>
    </div>
  );
}

export default Nameplate;
