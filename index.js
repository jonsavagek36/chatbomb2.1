require('./models/user');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let http = require('http');
let mongoose = require('mongoose');
let auth = require('./auth')();

let app = express();
let users = require('./api/v1/users_controller');
let requests = require('./api/v1/requests_controller');

app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.initialize());
app.use(bodyParser.json());

let port = process.env.PORT || 5000;
http.createServer(app).listen(port);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/app', function(req, res) {
  res.sendFile(path.join(__dirname, './public', 'app.html'));
});

app.get('/confirm', users.confirm_account);
app.get('/invite_join', users.invite_join);

app.post('/api/v1/users/sign_up', users.create_user);
app.post('/api/v1/users/log_in', users.login);

app.get('/api/v1/users/profile', auth.authenticate(), users.profile);
app.get('/api/v1/users/friends', auth.authenticate(), users.friendlist);
app.get('/api/v1/users/requests', auth.authenticate(), users.requests);

app.post('/api/v1/requests/send', auth.authenticate(), requests.send_request);
app.post('/api/v1/requests/accept', auth.authenticate(), requests.accept_request);

let io = require('socket.io')(http);
let chatbomb = require('./chatbomb');

io.sockets.on('connection', function(socket) {
  chatbomb.init(io, socket);
});

