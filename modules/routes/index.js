var express = require('express');
var router = express.Router();
var path = require( 'path' );
var bodyParser = require('body-parser');
var user = require('../user');


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.get('/', function(req, res){
  console.log('Base URL hit');
  res.sendFile( path.resolve( 'public/view/index.html' ) );
});

router.post('/', function(req, res) {
  console.log('in base url posst hit', req.body);
  user.findOne({
    email: req.body.username
  }, function(err, email) {
    if (err) {
      console.log('find user error: ', err);
      res.sendStatus(400);
    } else {
      if (email != undefined) {
        res.send('success');
      } else {
        console.log('no user found');
        res.send('no user found');
      }
    }
  });
});


module.exports = router;


module.exports = router;
