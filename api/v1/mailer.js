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
  let message = '';
  let mailOptions = {
    to: req.body.to,
    subject: '',
    html: message
  };
  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: 'Invite sent!' });
    }
  });
}
