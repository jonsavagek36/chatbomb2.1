import React, { Component } from 'react';

import Menubar from './chatbomb/Menubar';
import Profile from './chatbomb/profile/Profile';
import Requests from './chatbomb/requests/Requests';
import Friends from './chatbomb/friends/Friends';
import Chat from './chatbomb/chat/Chat';

import { getProfile, getFriends, getRequests } from './fetchCalls';

class Chatbomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      profile: {},
      friends: [],
      requests: []
    };
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    let user_profile = getProfile();
    let user_friends = getFriends();
    let user_requests = getRequests();
    this.setState({
      profile: user_profile,
      friends: user_friends,
      requests: user_requests
    });
  }
 
  updateView(newView) {
    this.setState({ view: newView });
  }

  render() {
    let view;
    if (this.state.view == 'profile') {
      view = <Profile profile={this.state.profile} />;
    } else if (this.state.view == 'requests') {
      view = <Requests requests={this.state.requests} />;
    } else if (this.state.view == 'friends') {
      view = <Friends friends={this.state.friends} />;
    } else if (this.state.view == 'chat') {
      view = <Chat />;
    } else {
      view = null;
    }
    return (
      <div>
        <Menubar updateView={this.updateView} />
        <div className='chatbomb-body'>
          {view}
        </div>
      </div>
    );
  }
}

export default Chatbomb;
