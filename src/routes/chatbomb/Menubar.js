import React, { Component } from 'react';

class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div className='menu-button'>
          <div className='menu-title' onClick={getProfile}>
            Profile
          </div>
          <div className='menu-notify'>
          </div>
        </div>
        <div className='menu-button'>
          <div className='menu-title' onClick={getRequests}>
            Requests
          </div>
          <div className='menu-notify' id='request-notify'>
          </div>
        </div>
        <div className='menu-button'>
          <div className='menu-title' onClick={getFriends}>
            Friends
          </div>
          <div className='menu-notify' id='friends-notify'>
          </div>
        </div>
      </div>
    );
  }
}

export default Menubar;
