let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  screen_name: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  avatar_url: { type: String, required: false },
  friends: { type: Array },
  requests: { type: Array }
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

mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost:27017/chatbomb_dev');
