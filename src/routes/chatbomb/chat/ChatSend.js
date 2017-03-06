import React from 'react';

const ChatSend = (props) => {
  return (
    <div className='chat-send'>
      <div className='send-input'><input type='text' id='send-text' onChange={props.sendLiveChat} /></div>
      <div className='send-button'><input type='submit' value='Send' onClick={props.sendMessage} /></div>
    </div>
  );
}

export default ChatSend;
