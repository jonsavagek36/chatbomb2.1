import React, { Component } from 'react';

import Nameplate from './Nameplate';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='page-title'>Friends</div>
        <div className='page-body'>
          <div className='friends-list'>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
