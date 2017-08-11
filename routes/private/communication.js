var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var VoiceResponse = twilio.twiml.VoiceResponse;

var client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// var twiml = new twilio.TwimlResponse();
//    twiml.say("Hello from your pals at Twilio! Have fun.");
//    res.writeHead(200, {'Content-Type': 'text/xml'});
//    res.end(twiml.toString());


// to send a text
router.post('/text', function(req, res) {
  console.log("req body: ", req.body);
  var d = new Date();
  client.messages.create({
    to: '+1' + req.body.phone,
    from: process.env.NUM_SRC,
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

   var url = 'https://hostabacall.herokuapp.com/index.xml';

   var options = {
       to: req.body.phone,
       from: process.env.NUM_SRC,
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
