let mongoose = require('mongoose');
let User = mongoose.model('User');
let jwt = require('jwt-simple');
let auth = require('../../auth');
let cfg = require('../../config/config');
let bcrypt = require('bcrypt');

exports.create = function(req, res) {
  new User({
    email: req.body.email,
    screen_name: req.body.screen_name,
    password: req.body.password
  }).save(function(err, result, count) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

exports.login = function(req, res) {
  if (req.body.email && req.body.password) {
    User.find({ email: req.body.email }, function(err, user) {
      user[0].comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          let payload = {
            id: user[0].id
          };
          let token = jwt.encode(payload, cfg.jwtSecret);
          res.json({
            token: token
          });
        } else {
          res.json({ error: 'Incorrect password' });
        }
      });
    });
  } else {
    res.sendStatus(401);
  }
}

exports.profile = function(req, res) {
  let user_profile = {
    id: req.user.id,
    email: req.user.email,
    screen_name: req.user.screen_name
  };
  res.json({ profile: user_profile });
}

exports.friendlist = function(req, res) {
  if (req.user.friends !== undefined) {
    let friendlist = [];
    req.user.friends.forEach(friend_id => {
      User.find({ _id: friend_id }, function(err, user) {
        if (err) throw err;
        if (user) {
          let friend = {
            id: user[0].id,
            email: user[0].email,
            screen_name: user[0].screen_name
          };
          friendlist.push(friend);
        }
      });
    });
    res.json({ friends: friendlist });
  } else {
    res.json({ friends: null });
  }
}

exports.requests = function(req, res) {
  if (req.user.requests !== undefined) {
    let requestlist = [];
    req.user.requests.forEach(request_id => {
      User.find({ _id: request_id }, function(err, user) {
        if (err) throw err;
        if (user) {
          let request = {
            id: user[0].id,
            email: user[0].email,
            screen_name: user[0].screen_name
          };
          requestlist.push(request);
        }
      });
    });
    res.json({ requests: requestlist });
  } else {
    res.json({ requests: null });
  }
}
