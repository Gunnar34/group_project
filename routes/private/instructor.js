var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../../services/user');
var User = require('../../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res){
  User.find(function(err, user){
    if (err) {
      res.send(err);
    }
    res.send(user);
  });
});

router.post('/', function (req, res) {
  user.createUser(req.body.email, function(err, user){
    if (err) {
      res.send(err);
    }
      res.send(user);

  });//end creat user
});//end post

module.exports = router;
