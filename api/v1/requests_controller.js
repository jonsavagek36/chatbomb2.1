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
        if (req.user.avatar_url !== undefined) {
          user.requests[last].request_avatar = req.user.avatar_url;
        }
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
        if (req.user.avatar_url !== undefined) {
          user.requests[last].request_avatar = req.user.avatar_url;
        }
        user.save(function(err) {
          if (err) {
            res.json({ message: err.message });
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
