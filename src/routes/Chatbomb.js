import React, { Component } from 'react';

import Menubar from './chatbomb/Menubar';
import Profile from './chatbomb/profile/Profile';
import Requests from './chatbomb/requests/Requests';
import Friends from './chatbomb/friends/Friends';
import Chat from './chatbomb/chat/Chat';

import { getProfile, getFriends, getRequests, sendRequest, sendInvite, acceptRequest } from './fetchCalls';

let socket = io.connect('http://localhost:5000');

class Chatbomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'requests',
      profile: {},
      friends: [],
      online_friends: [],
      selected_friend: {},
      requests: []
    };
    this.updateView = this.updateView.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
  }

  componentDidMount() {
    let get_profile = getProfile();
    let user_profile = {
      id: get_profile.id,
      email: get_profile.email,
      screen_name: get_profile.screen_name
    };
    this.setState({
      profile: user_profile,
      friends: get_profile.friends,
      requests: get_profile.requests
    });
  }

  updateView(newView) {
    this.setState({ view: newView });
  }

  selectFriend(friend) {
    this.setState({
      view: 'chat',
      selectedFriend: friend
    });
  }

  render() {
    let view;
    if (this.state.view == 'profile') {
      view = <Profile profile={this.state.profile} />;
    } else if (this.state.view == 'requests') {
      view = <Requests requests={this.state.requests} sendRequest={sendRequest} sendInvite={sendInvite} acceptRequest={acceptRequest} />;
    } else if (this.state.view == 'friends') {
      view = <Friends friends={this.state.friends} online_friends={this.state.online_friends} selectFriend={this.selectFriend} />;
    } else if (this.state.view == 'chat') {
      view = <Chat />;
    } else {
      view = null;
    }
    return (
      <div className='inside-body'>
        <Menubar updateView={this.updateView} />
        {view}
      </div>
    );
  }
}

export default Chatbomb;
