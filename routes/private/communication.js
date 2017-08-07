var express = require('express');
var router = express.Router();
var config = require('../../config/auth.js');
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var VoiceResponse = twilio.twiml.VoiceResponse;


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.username, //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        pass: config.mailPassword  //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
    }
});

var client = twilio(config.accountSid, config.authToken);
// var twiml = new twilio.TwimlResponse();
//    twiml.say("Hello from your pals at Twilio! Have fun.");
//    res.writeHead(200, {'Content-Type': 'text/xml'});
//    res.end(twiml.toString());



//to send an email
router.post('/email', function(req,res){
    var mailer = req.body;
    console.log(mailer);

    var mailOptions = {
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

   var url = 'http://localhost:3000/private/comm/index.xml';

   var options = {
       to: req.body.phone,
       from: config.numberSRC,
       url: url,
   };

   // Place an outbound call to the user, using the TwiML instructions
   // from the /outbound route
   client.calls.create(options)
     .then((message) => {
       console.log('message', message.responseText);
       res.sendStatus(200);
     })
     .catch((error) => {
       console.log('error', error);
       res.status(500).send(error);
     });
});

router.post('/index.xml', function(req, res){
  console.log('xml hit');
  var twimlResponse = new VoiceResponse();

          twimlResponse.say('Hello. Please go to the student check in computer. There has been a Pin failure. Please go to the student check in computer. Again, there has been a Pin failure.',
                            { voice: 'alice' , language: "en-gb"});

          res.send(twimlResponse.toString());

});


module.exports = router;
