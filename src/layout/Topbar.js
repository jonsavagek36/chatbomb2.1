import React, { Component } from 'react';

export default class Topbar extends Component {
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
