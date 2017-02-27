import React, { Component } from 'react';

import Menubar from './chatbomb/Menubar';
import Profile from './chatbomb/profile/Profile';
import Requests from './chatbomb/requests/Requests';
import Friends from './chatbomb/friends/Friends';
import Chat from './chatbomb/chat/Chat';

import { getProfile, getFriends, getRequests, sendRequest, sendInvite, acceptRequest } from './fetchCalls';
import Conversations from './Conversations';

let socket = io.connect('http://localhost:5000');

let conversations = new Conversations;

class Chatbomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'friends',
      profile: {},
      friends: [],
      online_friends: [],
      selected_friend: {},
      requests: [],
      conversations: conversations
    };
    this.refreshId = '';

    this.updateView = this.updateView.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
    this.takeRequest = this.takeRequest.bind(this);

    this.userInit = this.userInit.bind(this);
    this.refreshFriends = this.refreshFriends.bind(this);
    this.friendsRefreshed = this.friendsRefreshed.bind(this);
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('x-access-token', token);
    fetch('/api/v1/users/profile', {
      method: 'GET',
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(data => {
        let user = {
          id: data.profile.id,
          email: data.profile.email,
          screen_name: data.profile.screen_name
        };
        this.setState({
          profile: user,
          friends: data.profile.friends,
          requests: data.profile.requests
        });
        this.userInit();
      })
    // SOCK EVENTS
    socket.on('friends:refreshed', this.friendsRefreshed);
  }

  // SOCK FUNCTIONS
  userInit() {
    let id = this.state.profile.id;
    socket.emit('user:init', { user_id: id });
    this.refreshId = setInterval(this.refreshFriends, 1000);
    this.state.conversations.setProfile(this.state.profile);
  }

  refreshFriends() {
    if (this.state.friends) {
      socket.emit('refresh:friends', { friends: this.state.friends });
    }
  }

  friendsRefreshed(data) {
    this.setState({ online_friends: data.online_friends });
  }

  // REACT FUNCTIONS
  updateView(newView) {
    this.setState({ view: newView });
  }

  selectFriend(friend) {
    this.setState({
      view: 'chat',
      selectedFriend: friend
    });
  }

  takeRequest(request) {
    acceptRequest(request);
    let new_friends = getFriends();
    this.setState({ friends: new_friends });
  }

  render() {
    let view;
    if (this.state.view == 'profile') {
      view = <Profile profile={this.state.profile} />;
    } else if (this.state.view == 'requests') {
      view = <Requests requests={this.state.requests} sendRequest={sendRequest} sendInvite={sendInvite} acceptRequest={this.takeRequest} />;
    } else if (this.state.view == 'friends') {
      view = <Friends friends={this.state.friends} online_friends={this.state.online_friends} selectFriend={this.selectFriend} />;
    } else if (this.state.view == 'chat') {
      view = <Chat selectedFriend={this.state.selectedFriend} />;
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
