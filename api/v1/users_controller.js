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
  let user = {
    id: req.user.id,
    email: req.user.email,
    screen_name: req.user.screen_name,
    friends: req.user.friends,
    requests: req.user.requests
  };
  res.json({ profile: user });
}

exports.friendlist = function(req, res) {
  if (req.user.friends !== undefined) {
    res.json({ friends: req.user.friends });
  } else {
    res.json({ friends: null });
  }
}

exports.requests = function(req, res) {
  if (req.user.requests !== undefined) {
    res.json({ requests: req.user.requests });
  } else {
    res.json({ requests: null });
  }
}
