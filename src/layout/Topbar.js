import React, { Component } from 'react';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='top-bar'>
        <div className='bar-one'></div>
        <div className='bar-two'></div>
        <div className='bar-three'></div>
        <div className='bar-four'></div>
        <div className='bar-five'>
          <div className='top-title'>Chatbomb</div>
        </div>
      </div>
    );
  } 
}

export default Topbar;
