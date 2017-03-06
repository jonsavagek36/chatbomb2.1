import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'profile'
    }
  }

  render() {
    return (
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'>Profile</div>
        </div>
        <div className='profile-body'>
        </div>
      </div>
    );
  }
}
