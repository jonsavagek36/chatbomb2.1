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
      let selectFriend = () => {
        this.props.selectFriend(friend);
      }
      online_friends = this.props.online_friends.map((friend, idx) => {
        return <Nameplate friend={friend} selectFriend={selectFriend} key={idx} />;
      });
    }
    return (
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'>Friends</div>
        </div>
        <div className='friends-body'>
          <div className='online-friends'>
            <div className='friends-list'>
              {online_friends}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
