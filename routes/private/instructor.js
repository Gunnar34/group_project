var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../../services/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', function (req, res) {
  user.createUser(req.body.email, function(err, user){
    if (err) {
      res.send(err);
    }
      res.send(user);

  });
});

module.exports = router;
