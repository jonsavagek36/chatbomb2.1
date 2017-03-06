let passport = require('passport');
let passportJWT = require('passport-jwt');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let cfg = require('./config/config');
let ExtractJwt = passportJWT.ExtractJwt;
let Strategy = passportJWT.Strategy;

module.exports = function() {
  let params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token')
  };
  let strategy = new Strategy(params, function(payload, done) {
    User.findOne({ _id: payload.id }, function(err, user) {
      if (err) throw err;
      if (user) {
        done(null, user);
      } else {
        done(null, new Error('Invalid user'));
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};
