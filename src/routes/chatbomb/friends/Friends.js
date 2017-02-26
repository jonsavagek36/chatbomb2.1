import React, { Component } from 'react';

import Nameplate from './Nameplate';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let online_friends = null;
    if (this.props.online_friends !== undefined) {
      online_friends = this.props.online_friends.map((friend, idx) => {
        return <Nameplate friend={friend} key={idx} />;
      });
    }
    return (
      <div>
        <div className='page-title'>Friends</div>
        <div className='page-body'>
          <div className='friends-list'>
            {online_friends}
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
