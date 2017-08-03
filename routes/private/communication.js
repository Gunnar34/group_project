var express = require('express');
var router = express.Router();
var config = require('../../config/auth.js');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.username, //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        pass: config.mailPassword  //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
    }
});

var client = twilio(config.accountSid, config.authToken);




//to send an email
router.post('/email', function(req,res){
    var mailer = req.body;
    console.log(mailer);

    var mailOptions = {
//example: from: '"Scott" scott@primeacademy.io',
        from: '"'+ mailer.from +'" ' + config.username + '', // sender address -> //YOUR GMAIL USER HERE IN STRING + email not in string! -> EXAMPLE@gmail.com
        to: mailer.toEmail, // list of receivers
        subject: 'Appointment Reminder', // Subject line
        text: 'Your next appointment is on ' +  mailer.date + ' at '+ mailer.time +'.  We can wait to see you then!', // plain text body
        html: '<b>' + 'Your next appointment is on ' +  mailer.date + ' at '+ mailer.time +'.  We can\'t wait to see you then!' + '</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    res.send(200);
});
// to send a text
router.post('/text', function(req, res) {
  console.log("req body: ", req.body);
  var d = new Date();
  client.messages.create({
    to: '+1' + req.body.phone,
    from: config.numberSRC,
    body: 'From Abamath: Your student ' + req.body.name +', was checked out at '+ d.getHours() + ':' + d.getMinutes() + '.' // plain text body,
  }, function(err, message) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(message.sid);
      res.sendStatus(200);
    }
  });
});

// to make a call
router.post('/call', function(req, res) {
  console.log("req body: ", req.body);
  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: '+1' + req.body.phone,
    from: config.numberSRC
  }, function(err, call) {
    if (call) {
      console.log('call ', call);
      process.stdout.write(call.sid);
      res.send('success!');
    } else {
      console.log(err);
      res.send(err);
    }

  });
});

module.exports = router;
