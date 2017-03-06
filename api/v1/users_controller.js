let mongoose = require('mongoose');
let User = mongoose.model('User');
let jwt = require('jwt-simple');
let auth = require('../../auth');
let cfg = require('../../config/config');
let mailer = require('./mailer');
let path = require('path');

exports.create_user = function(req, res) {
  new User({
    email: req.body.email,
    screen_name: req.body.screen_name,
    password: req.body.password
  }).save(function(err, result, count) {
    if (err) {
      throw err;
      res.json({ message: 'Failed to create' });
    } else {
      mailer.send_confirm(result);
      res.json({ message: 'Success' });
    }
  });
}

exports.confirm_account = function(req, res) {
  if (req.params.id) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) throw err;
      if (user) {
        user.locked = false;
        user.save(function(err) {
          if (err) {
            throw err;
          } else {
            res.sendFile(path.join(__dirname, '/public', 'confirmed.html'));
          }
        });
      }
    });
  }
}

exports.invite_join = function(req, res) {
  if (req.params.code) {
    User.findOne({ _id: req.params.code }, function(err, user) {
      if (err) throw err;
      if (user) {
        res.sendFile(path.join(__dirname, '/public', 'signup.html'));
      } else {
        res.send('<p>Nice try</p>');
      }
    });
  }
}

exports.login = function(req, res) {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) throw err;
      if (user) {
        if (!user.locked) {
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              let payload = {
                id: user.id
              };
              let token = jwt.encode(payload, cfg.jwtSecret);
              res.json({ token: token });
            } else {
              res.json({ message: 'Incorrect password' });
            }
          });
        } else {
          res.json({ message: 'You must confirm your account first' });
        }
      } else {
        res.json({ message: 'User does not exist' });
      }
    });
  } else {
    res.sendStatus(401);
  }
}

exports.profile = function(req, res) {
  if (req.user) {
    let user = {
      id: req.user.id,
      email: req.user.email,
      screen_name: req.user.screen_name,
      friends: req.user.friends,
      requests: req.user.requests
    };
    res.json({ profile: user });
  } else {
    res.json({ message: 'Failed to authenticate' });
  }
}

exports.friendlist = function(req, res) {
  if (req.user) {
    if (req.user.friends !== undefined) {
      res.json({ friends: req.user.friends });
    } else {
      res.json({ friends: null });
    }
  } else {
    res.json({ message: 'Failed to get friends' });
  }
}

exports.requests = function(req, res) {
  if (req.user) {
    if (req.user.requests !== undefined) {
      res.json({ requests: req.user.requests });
    } else {
      res.json({ requests: null });
    }
  } else {
    res.json({ message: 'Failed to get requests' });
  }
}
