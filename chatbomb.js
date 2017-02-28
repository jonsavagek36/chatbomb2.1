let io;
let clients = {};

exports.init = function(sio, socket) {
  io = sio;

  socket.on('user:init', function(data) {
    clients[data.user_id] = socket.id;
  });

  socket.on('refresh:friends', function(data) {
    let on_friends = [];
    data.friends.forEach(friend => {
      if (clients[friend.id] !== undefined) {
        on_friends.push(friend);
      }
    });
    socket.emit('friends:refreshed', { online_friends: on_friends });
  });

  socket.on('send:message', function(data) {
    if (clients[data.friend.id] == undefined) { 
      socket.emit('friend:offline');
    } else {
      let target_sock = clients[data.friend.id];
      io.to(target_sock).emit('receive:message', { friend: data.friend, message: data.message });
    }
  });

  socket.once('disconnect', function() {
    let user_id = getKey(socket.id, clients);
    delete clients[user_id];
  });
}

function getKey(val, obj) {
  for (let key in obj) {
    value = obj[key];
    if (value == val) {
      return key;
      break;
    }
  }
}
