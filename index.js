require('./models/user');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');
let jwt = require('jwt-simple');
let auth = require('./auth.js')();
let cfg = require('./config/config.js');

let users = require('./api/v1/users_controller');
let requests = require('./api/v1/requests_controller');
let mailer = require('./api/v1/mailer');

let chatbomb = require('./chatbomb');

app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.initialize());
app.use(bodyParser.json());

let port = process.env.PORT || 5000;
let http = require('http').createServer(app).listen(port);

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname, './public/app.html'));
});

app.post('/api/v1/users/sign_up', users.create);
app.post('/api/v1/users/log_in', users.login);

app.get('/api/v1/users/testAuth', auth.authenticate(), function(req, res) {
  console.log('success');
});
app.get('/api/v1/users/profile', auth.authenticate(), users.profile);
app.get('/api/v1/users/friends', auth.authenticate(), users.friendlist);
app.get('/api/v1/users/requests', auth.authenticate(), users.requests);

app.post('/api/v1/requests/send', auth.authenticate(), requests.send_request);
app.post('/api/v1/requests/accept', auth.authenticate(), requests.accept_request);

app.post('/api/v1/invite/send', auth.authenticate(), mailer.send_invite);

let io = require('socket.io')(http);

io.sockets.on('connection', function(socket) {
  chatbomb.init(io, socket);
});
