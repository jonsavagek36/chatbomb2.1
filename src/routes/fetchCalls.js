// Main App fetch calls
import { browserHistory } from 'react-router';

exports.signUp = function() {
  let emailNode = document.getElementById('signup-email');
  let nameNode = document.getElementById('signup-screenname');
  let passNode = document.getElementById('signup-password');
  let confirmNode = document.getElementById('confirm-password');
  if (passNode.value == confirmNode.value) {
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
          console.log('Failed to register.');
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      emailNode.value = '';
      nameNode.value = '';
      passNode.value = '';
      confirmNode.value = '';
  } else {
    document.getElementById('signup-message').textContent = 'Passwords must match.';
  }
}

exports.loginUser = function() {
  let emailNode = document.getElementById('login-email');
  let passNode = document.getElementById('login-password');
  let fetchBody = {
    email: emailNode.value,
    password: passNode.value
  };
  console.log(fetchBody);
  let myHeaders = new Headers();
  myHeaders.append('Content-Type','application/json');
  fetch('/api/v1/users/log_in', {
    method: 'POST',
    body: JSON.stringify(fetchBody),
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        console.log('Failed to login');
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      sessionStorage.setItem('token', data.token);
      browserHistory.push('/app/chatbomb');
    })
  emailNode.value = '';
  passNode.value = '';
}

exports.testAuth = function() {
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('x-access-token', token);
  fetch('/api/v1/users/testAuth', {
    method: 'GET',
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        console.log('Abject Failure');
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}

exports.getProfile = function() {
  let profile = {};
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
      } else {
        console.log('Failed to get profile');
      }
    })
    .then(response => response.json())
    .then(data => {
      let id = data.profile.id;
      let email = data.profile.email;
      let screen_name = data.profile.screen_name;
      let friends = data.profile.friends;
      let requests = data.profile.requests;
      profile.id = id;
      profile.email = email;
      profile.screen_name = screen_name;
      profile.friends = friends;
      profile.requests = requests;
    })
  return profile;
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
      if (response.ok) {
        return response;
      } else {
        console.log('Failed to get friends');
      }
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

exports.getRequests = function() {
  let requests = [];
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('x-access-token', token);
  fetch('/api/v1/users/requests', {
    method: 'GET',
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        console.log('Failed to get response');
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.requests !== null) {
        data.requests.forEach(request => {
          requests.push(request);
        });
      }
    })
  return requests;
}

exports.sendRequest = function() {
  let emailNode = document.getElementById('request-email');
  let nameNode = document.getElementById('request-name');
  let fetchBody = {
    req_email: emailNode.value,
    req_name: nameNode.value
  };
  let token = sessionStorage.getItem('token');
  let myHeaders = new Headers();
  myHeaders.append('x-access-token', token);
  fetch('/api/v1/requests/send', {
    method: 'POST',
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        console.log('Failed to send request');
      }
    })
    .then(response => response.json())
    .then(data => {
      emailNode.value = '';
      nameNode.value = '';
    })
}

exports.sendInvite = function() {
  let emailNode = document.getElementById('invite-email');
  let messageNode = document.getElementById('invite-message');
  messageNode.textContent = null;
  if (emailNode.value) {
    let fetchBody = {
      invite_email: emailNode.value
    };
    let token = sessionStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('x-access-token', token);
    fetch('/api/v1/invite/send', {
      method: 'POST',
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          console.log('Failed to send invite');
        }
      })
      .then(response => response.json())
      .then(data => {
        let msg = data.message;
        messageNode.textContent = msg;
        emailNode.value = '';
      })
  } else {
    messageNode.textContent = 'You must input an e-mail address.';
  }
}
