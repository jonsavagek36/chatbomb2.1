let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let FriendSchema = new Schema({
  friend_id: { type: String, required: true },
  friend_email: { type: String, required: true },
  friend_name: { type: String, required: true }
});

let RequestSchema = new Schema({
  request_id: { type: String, required: true },
  request_email: { type: String, required: true },
  request_name: { type: String, required: true }
});

let UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  screen_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  locked: { type: Boolean },
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
mongoose.connect(`mongodb://jonsavagek36:${process.env.MLAB_PASSWORD}@ds113680.mblab.com/chatbomb`);
