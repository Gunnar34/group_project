var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var VoiceResponse = twilio.twiml.VoiceResponse;

var client = twilio( process.env.accountSid, process.env.authToken);
// var twiml = new twilio.TwimlResponse();
//    twiml.say("Hello from your pals at Twilio! Have fun.");
//    res.writeHead(200, {'Content-Type': 'text/xml'});
//    res.end(twiml.toString());


// to send a text
router.post('/text', function(req, res) {
  console.log("req body: ", req.body);
  var d = new Date();
  var hours = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = hours >= 12 ? 'pm' : 'am';
 hours = hours % 12;
 hours = hours ? hours : 12; // the hour '0' should be '12'
  client.messages.create({
    to: '+1' + req.body.phone,
    from:  process.env.numberSRC,
    body: 'From Abamath: Your student ' + req.body.name +', was checked out at '+ hours + ':' + min + ampm + '.' // plain text body,
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

   var url = 'https://hostabacall.herokuapp.com/index.xml';

   var options = {
       to: req.body.phone,
       from: '+16512731107',
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



module.exports = router;
