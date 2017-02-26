let nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: '',
    pass: ''
  }
});

exports.send_invite = function(req, res) {
  let message = `${req.user.screen_name} has invited you to join Chatbomb.  <a href='http://localhost:5000/join?code=${req.user.id}'>Click Here</a>`;
  let mailOptions = {
    to: req.body.invite_email,
    subject: `You've been CHATBOMBED`,
    html: message
  };
  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: 'Invite sent!' });
    }
  });
}
