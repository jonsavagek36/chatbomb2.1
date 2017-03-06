import React, { Component } from 'react';

export default class Menubar extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    let getProfile = () => {
      this.props.updateView('profile');
    }
    let getRequests = () => {
      this.props.updateView('requests');
    }
    let getFriends = () => {
      this.props.updateView('friends');
    }
    return (
      <div className='menu-bar'>
        <div className='menu-button' onClick={getProfile}>
          Profile
        </div>
        <div className='menu-button' onClick={getRequests}>
          Requests
        </div>
        <div className='menu-button' onClick={getFriends}>
          Friends
        </div>
      </div>
    );
  }
}

