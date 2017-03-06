import React, { Component } from 'react';

import Menubar from './chatbomb/Menubar';
import Profile from './chatbomb/profile/Profile';
import Requests from './chatbomb/requests/Requests';
import Friends from './chatbomb/friends/Friends';
import Chat from './chatbomb/chat/Chat';

import { sendInvite, sendRequest, acceptRequest } from './exports/fetchCalls';

let socket = io.connect();

export default class Chatbomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'friends',
      profile: {},
      friends: [],
      online_friends: [],
      selected_friend: {},
      requests: [],
      live_chat: '',
      conversations: {}
    }
    this.intervalId = '';
    this.updateView = this.updateView.bind(this);
    this.updateFriends = this.updateFriends.bind(this);
    this.userInit = this.userInit.bind(this);
    this.refreshRequest = this.refreshRequest.bind(this);
    this.refreshFriends = this.refreshFriends.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
    this.sendLiveChat = this.sendLiveChat.bind(this);
    this.receiveLiveChat = this.receiveLiveChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  componentDidMount() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      browserHistory.push('/app');
    } else {
      let myHeaders = new Headers();
      myHeaders.append('x-access-token', token);
      fetch('/api/v1/users/profile', {
        method: 'GET',
        headers: myHeaders
      })
        .then(response => {
          if (response.ok) return response;
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
    }

    socket.on('friends:refreshed', this.refreshFriends);
    socket.on('receive:live', this.receiveLiveChat);
    socket.on('friend:offline', this.friendOffline);
    socket.on('receive:message', this.receiveMessage);
  }

  userInit() {
    socket.emit('user:init', { id: this.state.profile.id });
    this.intervalId = setInterval(this.refreshRequest, 1000);
  }

  refreshRequest() {
    socket.emit('refresh:friends', { friends: this.state.friends });
  }

  refreshFriends(data) {
    this.setState({ online_friends: data.online_friends });
  }

  updateView(newView) {
    this.setState({ view: newView });
  }

  updateFriends(newFriends) {
    this.setState({ friends: newFriends });
  }

  selectFriend(friend) {
    this.setState({
      selected_friend: friend,
      view: 'chat',
      live_chat: ''
    });
  }

  sendLiveChat() {
    let textNode = document.getElementById('send-text');
    socket.emit('send:live', { friend: this.state.selected_friend, live_update: textNode.value });
  }

  receiveLiveChat(data) {
    if (this.state.selected_friend.id == data.friend.id) {
      this.setState({ live_chat: data.live_update });
    }
  }

  friendOffline() {
    let msg_list = document.getElementById('chat-ul');
    msg_list.innerHTML = `<li>${this.state.selected_friend.screen_name} is offline</li>`;
  }

  sendMessage(event) {
    event.preventDefault();
    let textNode = document.getElementById('send-text');
    let conversations = this.state.conversations;
    let code = this.state.selected_friend.id;
    if (conversations[code] == undefined) {
      conversations[code] = [];
      conversations[code].push({
        sender: this.state.profile,
        message: textNode.value
      });
      socket.emit('send:message', { sender: this.state.profile, target: this.state.selected_friend, message: textNode.value });
    } else {
      let last = conversations[code].length - 1;
      if (conversations[code][last].sender.id != this.state.profile.id) {
        conversations[code].push({
          sender: this.state.profile,
          message: textNode.value
        });
        socket.emit('send:message', { sender: this.state.profile, target: this.state.selected_friend, message: textNode.value });
      }
    }
    this.setState({ conversations: conversations });
    textNode.value = '';
  }

  receiveMessage(data) {
    let conversations = this.state.conversations;
    let code = data.sender.id;
    if (!conversations[code]) conversations[code] = [];
    conversations[code].push({
      sender: data.sender,
      message: data.message
    });
    this.setState({ conversations: conversations });
    if (data.sender.id == this.state.selected_friend.id) {
      this.setState({ live_chat: '' });
    }
  }

  render() {
    let view = null;
    if (this.state.view == 'profile') view = <Profile profile={this.state.profile} />;
    if (this.state.view == 'requests') view = <Requests
                                                requests={this.state.requests}
                                                sendInvite={sendInvite}
                                                sendRequest={sendRequest}
                                                acceptRequest={acceptRequest}
                                                updateFriends={this.updateFriends}
                                                 />;
    if (this.state.view == 'friends') view = <Friends
                                              online_friends={this.state.online_friends}
                                              selectFriend={this.selectFriend}
                                                 />;
    if (this.state.view == 'chat') view = <Chat
                                            selected_friend={this.state.selected_friend}
                                            sendLiveChat={this.sendLiveChat}
                                            live_chat={this.state.live_chat}
                                            sendMessage={this.sendMessage}
                                            conversations={this.state.conversations}
                                                 />;
    return (
      <div className='inside-body'>
        <Menubar updateView={this.updateView} />
        {view}
      </div>
    );
  }
}

