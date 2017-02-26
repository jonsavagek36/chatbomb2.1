let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let FriendSchema = new Schema({
  friend_id: { type: String, required: true, index: { unique: true } },
  friend_email: { type: String, required: true, index: { unique: true } },
  friend_name: { type: String, required: true, index: { unique: true } },
  friend_avatar: { type: String, required: false }
});

let RequestSchema = new Schema({
  request_id: { type: String, required: true, index: { unique: true } },
  request_email: { type: String, required: true, index: { unique: true } },
  request_name: { type: String, required: true, index: { unique: true } },
  request_avatar: { type: String, required: false }
})

let UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  screen_name: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  avatar_url: { type: String, required: false },
  friends: [FriendSchema],
  requests: [RequestSchema]
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  let user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return cb(err, null);
    cb(null, isMatch);
  });
};

mongoose.model('Friend', FriendSchema);
mongoose.model('Request', RequestSchema);
mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost:27017/chatbomb_dev');
