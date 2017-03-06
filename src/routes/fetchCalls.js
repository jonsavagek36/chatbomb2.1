import { browserHistory } from 'react-router';

exports.loginUser = function() {
  let emailNode = document.getElementById('login-email');
  let passNode = document.getElementById('login-password');
  let messageNode = document.getElementById('login-message');
  messageNode.textContent = '';
  let fetchBody = {
    email: emailNode.value,
    password: passNode.value
  };
  let myHeaders = newHeaders();
  myHeaders.append('Content-Type', 'application/json');
  fetch('/api/v1/users/log_in', {
    method: 'POST',
    body: JSON.stringify(fetchBody),
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        messageNode.textContent = 'Failed to log in';
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) messageNode.textContent = data.message;
      if (data.token) sessionStorage.setItem('token', data.token);
      if (data.message && data.token) browserHistory.push('/app/chatbomb');
    })
  emailNode.value = '';
  passNode.value = '';
}

exports.signUp = function() {
  let emailNode = document.getElementById('signup-email');
  let nameNode = document.getElementById('signup-screenname');
  let passNode = document.getElementById('signup-password');
  let confirmNode = document.getElementById('confirm-password');
  let emailMsg = document.getElementById('email-message');
  let nameMsg = document.getElementById('screenname-message');
  let passwordMsg = document.getElementById('password-message');
  let messageNode = document.getElementById('signup-message');
  emailMsg.textContent = '';
  nameMsg.textContent = '';
  passwordMsg.textContent = '';
  messageNode.textContent = '';
  if (emailNode.value == null || emailNode.value == '') emailMsg.textContent = 'Must enter e-mail';
  if (nameNode.value == null || nameNode.value == '') nameMsg.textContent = 'Must enter screen name';
  if (passNode.value == null || passNode.value == '') passwordMsg.textContent = 'Must enter password';
  if (confirmNode.value == null || confirmNode.value == '') passwordMsg.textContent = 'Must confirm password';
  if (passNode.value != confirmNode.value) passwordMsg.textContent = 'Passwords must match';
  if (emailNode.value && nameNode.value && passNode.value && confirmNode.value && passNode.value == confirmNode.value) {
    let fetchBody = {
      email: emailNode.value,
      screen_name: nameNode.value,
      password: passNode.value
    };
    let myHeaders = new Headers();
    myHeaders.append('Content-Type','application/json');
    fetch('/api/v1/users/sign_up', {
      method: 'POST',
      body: JSON.stringify(fetchBody),
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          messageNode.textContent = 'Sign up failure';
        }
      })
      .then(response => response.json())
      .then(data => {
        browserHistory.push('/app');
        emailNode.value = '';
        nameNode.value = '';
        passNode.value = '';
        confirmNode.value = '';
      })
  }
}

exports.sendInvite = function() {
  let emailNode = document.getElementById('invite-email');
  let messageNode = document.getElementById('invite-message');
  messageNode.textContent = '';
  if (emailNode.value) {
    let fetchBody = {
      invite_email: emailNode.value
    };
    let token = sessionStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('x-access-token', token);
    fetch('/api/v1/invite/send', {
      method: 'POST',
      body: JSON.stringify(fetchBody),
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) return response;
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) messageNode.textContent = data.message;
        emailNode.value = '';
      })
  } else {
    messageNode.textContent = 'You must input an e-mail address';
  }
}

exports.sendRequest = function() {
  let emailNode = document.getElementById('request-email');
  let nameNode = document.getElementById('request-name');
  let msgNode = document.getElementById('req-message');
  msgNode.textContent = '';
  if (emailNode.value || nameNode.value) {
    let fetchBody = {};
    if (emailNode.value) fetchBody.req_email = emailNode.value;
    if (nameNode.value) fetchBody.req_name = nameNode.value;
    let token = sessionStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('x-access-token', token);
    fetch('/api/v1/requests/send', {
      method: 'POST',
      body: JSON.stringify(fetchBody),
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          emailNode.value = '';
          nameNode.value = '';
        }
      })
  } else {
    msgNode.textContent = 'You must request by e-mail or screen name';
  }
}

exports.acceptRequest = function(request_info) {
  let new_friends = [];
  let fetchBody = {
    request: request_info
  };
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('x-access-token', token);
  fetch('/api/v1/requests/accept', {
    method: 'POST',
    body: JSON.stringify(fetchBody),
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) return response;
    })
    .then(response => response.json())
    .then(data => {
      if (data.friends) {
        data.friends.forEach(friend => {
          new_friends.push(friend);
        });
      }
    })
  return new_friends;
}

exports.getFriends = function() {
  let friends = [];
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('x-access-token', token);
  fetch('/api/v1/users/friends', {
    method: 'GET',
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) return response;
    })
    .then(response => response.json())
    .then(data => {
      if (data.friends !== null) {
        data.friends.forEach(friend => {
          friends.push(friend);
        });
      }
    })
  return friends;
}

