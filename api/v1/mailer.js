let nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'osmochat',
    pass: process.env.MAIL_PWD
  }
});

exports.send_confirm = function(user) {
  let message = `Please <a href='https://chat-bomb.herokuapp.com/confirm?id=${user.id}'>CLICK HERE</a> to confirm your Chatbomb account!`;
  let mailOptions = {
    to: user.email,
    subject: `CHATBOMB Confirmation`,
    html: message
  };
  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) throw err;
  });
}

exports.send_invite = function(req, res) {
  let message = `${req.user.screen_name} has invited you to join Chatbomb.  <a href='https://chat-bomb.herokuapp.com/invite_join?code=req.user.id'>CLICK HERE</a> to join!`;
  let mailOptions = {
    to: req.body.invite_email,
    subject: `You've been CHATBOMBED`,
    html: message
  };
  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) {
      res.json({ message: 'Invite failure' });
      throw err;
    } else {
      res.json({ message: 'Invite sent' });
    }
  });
}
