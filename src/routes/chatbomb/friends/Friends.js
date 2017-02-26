import React, { Component } from 'react';

import Nameplate from './Nameplate';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let friendlist = null;
    if (this.props.friends !== undefined) {
      friendlist = this.props.friends.map(friend => {
        return <Nameplate friend={friend} />;
      });
    }
    return (
      <div>
        <div className='page-title'>Friends</div>
        <div className='page-body'>
          <div className='friends-list'>
            {friendlist}
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
