let mongoose = require('mongoose');
let User = mongoose.model('User');
let Request = mongoose.model('Request');

exports.send_request = function(req, res) {
  let sender_id = req.user.id;
  if (req.body.req_email) {
    User.find({ email: req.body.req_email }, function(err, users) {
      if (err) throw err;
      if (users) {
        let user = users[0];
        let last = user.requests.length;
        user.requests[last].request_id = req.user.id;
        user.requests[last].request_email = req.user.email;
        user.requests[last].request_name = req.user.screen_name;
        user.save(function(err) {
          if (err) {
            res.json({ message: err.message });
          } else {
            res.json({ message: 'Request sent' });
          }
        });
      }
    });
  } else if (req.body.req_name && !req.body.req_email) {
    User.find({ screen_name: req.body.req_name }, function(err, users) {
      if (err) throw err;
      if (users) {
        let user = users[0];
        let last = user.requests.length;
        user.requests[last].request_id = req.user.id;
        user.requests[last].request_email = req.user.email;
        user.requests[last].request_name = req.user.screen_name;
        user.save(function(err) {
          if (err) {
            res.json({ message: err.message });
            throw err;
          } else {
            res.json({ message: 'Request sent' });
          }
        });
      }
    });
  } else {
    res.json({ message: 'Must use e-mail or screen name' });
  }
}

exports.accept_request = function(req, res) {
  User.find({ _id: req.user.id }, function(err, users) {
    if (err) throw err;
    if (users) {
      let user = users[0];
      let last = user.friends.length;
      user.requests.id(req.body.request.id).remove();
      user.friends[last].friend_id = req.body.request.request_id;
      user.friends[last].friend_email = req.body.request.request_email;
      user.friends[last].friend_name = req.body.request.request_name;
      user.save(function(err) {
        if (err) {
          res.json({ message: err.message });
          throw err;
        } else {
          res.json({ message: 'Friend added' });
        }
      });
      User.find({ _id: req.body.request.request_id }, function(err, users) {
        if (err) throw err;
        if (users) {
          let friend = users[0];
          let last = friend.friends.length;
          friend.friends[last].friend_id = user.id;
          friend.friends[last].friend_email = user.email;
          friend.friends[last].friend_name = user.screen_name;
          friend.save(function(err) {
            if (err) throw err;
          });
        }
      });
    }
  });
}
