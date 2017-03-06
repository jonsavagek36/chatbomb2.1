let mongoose = require('mongoose');
let User = mongoose.model('User');
let Request = mongoose.model('Request');

exports.send_request = function(req, res) {
  if (req.user) {
    if (req.body.req_email) {
      User.findOne({ email: req.body.req_email }, function(err, user) {
        if (err) throw err;
        if (user) {
          user.requests.push({
            request_id: req.user.id,
            request_email: req.user.email,
            request_name: req.user.screen_name
          });
          user.save(function(err) {
            if (err) {
              res.json({ message: 'Request error' });
              throw err;
            } else {
              res.json({ message: 'Request sent' });
            }
          });
        } else {
          res.json({ message: 'User not found' });
        }
      });
    } else if (req.body.req_name && !req.body.req_email) {
      User.findOne({ screen_name: req.body.req_name }, function(err, user) {
        if (err) throw err;
        if (user) {
          user.requests.push({
            request_id: req.user.id,
            request_email: req.user.email,
            request_name: req.user.screen_name
          });
          user.save(function(err) {
            if (err) {
              res.json({ message: 'Request error' });
              throw err;
            } else {
              res.json({ message: 'Request sent' });
            }
          });
        } else {
          res.json({ message: 'User not found' });
        }
      });
    } else {
      res.json({ message: 'Must use e-mail or screen name' });
    }
  }
}

exports.accept_request = function(req, res) {
  if (req.user) {
    User.findOne({ _id: req.user.id }, function(err, user) {
      if (err) throw err;
      if (user) {
        user.requests.id(req.body.request.id).remove();
        user.friends.push({
          friend_id: req.body.request.request_id,
          friend_email: req.body.request.request_email,
          friend_name: req.body.request.request_name
        });
        user.save(function(err) {
          if (err) {
            res.json({ message: 'Error accepting' });
            throw err;
          } else {
            res.json({ message: 'Friend added' });
          }
        });
        User.findOne({ _id: req.body.request.request_id }, function(err, friend) {
          if (err) throw err;
          if (friend) {
            friend.friends.push({
              friend_id: req.user.id,
              friend_email: req.user.email,
              friend_name: req.user.screen_name
            });
            friend.save(function(err) {
              if (err) throw err;
            });
          }
        });
        res.json({ friends: user.friends });
      }
    });
  }
}

