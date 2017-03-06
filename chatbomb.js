let io;
let clients = {};

exports.init = function(sio, socket) {
  io = sio;

  socket.on('user:init', function(data) {
    clients[data.id] = socket.id;
  });

  socket.on('refresh:friends', function(data) {
    let ref_friends = [];
    data.friends.forEach(friend => {
      if (clients[friend.id]) ref_friends.push(friend);
    });
    socket.emit('friends:refreshed', { online_friends: ref_friends });
  });

  socket.on('send:live', function(data) {
    let target_sock = clients[data.friend.id];
    if (target_sock) {
      io.to(target_sock).emit('receive:live', { friend: data.friend, live_update: data.live_update });
    }
  });

  socket.on('send:message', function(data) {
    let target_sock = clients[data.target.id];
    if (target_sock) {
      io.to(target_sock).emit('receive:message', data);
    } else {
      socket.emit('friend:offline');
    }
  });

  socket.once('disconnect', function() {
    delete clients[getKey(socket.id, clients)];
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
